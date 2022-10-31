const { Collection } = require('discord.js');
const { REST, Routes } = require('discord.js');
const { token, clientId, guildId, version } = require('../config.json');

const fs = require('fs');
const path = require('path');

const commandsPath = path.join(process.cwd(), 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(fileName => fileName.endsWith('.command.js'));

const loadCommands = client => {
	const commands = new Collection();
	try {
		commandFiles.forEach(file => {
			const filePath = path.join(process.cwd(), 'commands', file);
			const command = require(filePath);
			if (command.data.name && command.run) {
				commands.set(command.data.name, command);
			} else {
				console.log('Error loading command');
			}
		});
	} catch (error) {
		console.error(error);
	}
	client.commands = commands;
};

const deployCommands = () => {
	const commands = [];
	const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.command.js'));

	for (const file of commandFiles) {
		const command = require(`../commands/${file}`);
		commands.push(command.data.toJSON());
	}

	const rest = new REST({ version: '10' }).setToken(token);

	(async () => {
		try {
			await rest.put(Routes.applicationCommands(clientId), { body: commands });
		} catch (error) {
			console.error(error);
		}
	})();
};

const configureCommands = client => {
	console.log('Start loading commands');
	loadCommands(client);
	console.log('Successfully commands loaded');

	console.log('Start deploying commands');
	deployCommands();
	console.log('Successfully commands deployed');
};

module.exports = { configureCommands };
