import { Client, GatewayIntentBits } from 'discord.js';
import config from '../config.json' assert { type: 'json' };

const createClient = () => {
	const client = new Client({
		intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildVoiceStates],
	});
	client.isBotInRoom = () => client.voice.adapters.size > 0;
	client.isUserInRoom = interaction => interaction.member.voice.channel;
	return client;
};

const loginClient = client => client.login(config.token).catch('Error connecting client');

export { createClient, loginClient };
