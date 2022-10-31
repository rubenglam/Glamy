const { Events } = require('discord.js');

module.exports = {
	name: Events.ClientReady,
	once: true,
	run: async client => {
		console.log(`Ready! Logged in as ${client.user.tag}`);
	},
};
