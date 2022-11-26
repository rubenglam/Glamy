import { Events } from 'discord.js';

export default {
	name: Events.Disco,
	once: true,
	run: async client => {
		console.log(`Ready! Logged in as ${client.user.tag}`);
	},
};
