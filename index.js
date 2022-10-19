const publicToken = 'https://discord.com/api/oauth2/authorize?client_id=1032012422992646264&permissions=2150640704&scope=bot%20applications.commands';

const { Client, GatewayIntentBits } = require('discord.js');
const dotenv = require('dotenv');
const { REST } = require('@discordjs/rest');

dotenv.config();

const token = process.env.TOKEN;
const clientId = '1032012422992646264';

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.on('ready', () => {
	console.log(`Logged in as ${client.user.tag}!`);
});

client.on('interactionCreate', async interaction => {
	console.log('interaction');
	if (!interaction.isChatInputCommand()) return;

	if (interaction.commandName === 'ping') {
		await interaction.reply('Pong!');
	}
});

client.login(token);
