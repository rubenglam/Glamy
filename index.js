import { Client, Events, GatewayIntentBits, Partials } from 'discord.js';
import { configureCommands } from './handlers/commands.handler.js';
import { configureDistube } from './handlers/distube.handler.js';
import { configureEvents } from './handlers/events.handler.js';
import { configureBotUtils } from './utils/bot.utils.js';
import { configureComponents } from './handlers/components.handler.js';
import config from './config.json' assert { type: 'json' };

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

configureBotUtils(client);
configureDistube(client);
configureEvents(client);

await configureComponents(client);
await configureCommands(client);

client.login(config.token).catch('Error connecting client');
