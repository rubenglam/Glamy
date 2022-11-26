import { Collection, REST, Routes } from 'discord.js';
import config from '../config.json' assert { type: 'json' };

import fs from 'fs';
import path from 'path';

const commandsPath = path.join(process.cwd(), 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(fileName => fileName.endsWith('.command.js'));

const loadCommands = async client => {
	const commands = new Collection();
	try {
		for (const commandFile of commandFiles) {
			const command = (await import(`../commands/${commandFile}`)).default;
			if (command.data.name && command.run) {
				commands.set(command.data.name, command);
			} else {
				console.log('Error loading command');
			}
		}
	} catch (error) {
		console.error(error);
	}
	client.commands = commands;
};

const deployCommands = async () => {
	const commands = [];
	const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.command.js'));

	for (const file of commandFiles) {
		const command = (await import(`../commands/${file}`)).default;
		commands.push(command.data.toJSON());
	}

	const rest = new REST({ version: '10' }).setToken(config.token);

	(async () => {
		try {
			await rest.put(Routes.applicationCommands(config.clientId), { body: commands });
		} catch (error) {
			console.error(error);
		}
	})();
};

const configureCommands = async client => {
	console.log('Start loading commands');
	await loadCommands(client);
	console.log('Successfully commands loaded');

	console.log('Start deploying commands');
	await deployCommands();
	console.log('Successfully commands deployed');
};

export { configureCommands };
