const { Client, Events, GatewayIntentBits, Partials } = require('discord.js');
const { configureCommands } = require('./handlers/commands.handler.js');
const { configureDistube } = require('./handlers/distube.handler.js');
const { configureEvents } = require('./handlers/events.handler.js');
const { token } = require('./config.json');

const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		// GatewayIntentBits.GuildMembers,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
		GatewayIntentBits.GuildVoiceStates,
		// GatewayIntentBits.GuildMessageReactions,
		// GatewayIntentBits.GuildEmojisAndStickers,
	],
	//partials: [Partials.Message, Partials.Channel, Partials.Reaction, Partials.GuildMember, Partials.User],
});

configureDistube(client);

configureEvents(client);
configureCommands(client);

client.login(token).catch('Error connecting client');
