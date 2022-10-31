const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder().setName('version').setDescription('Returns app version number'),
	run: async interaction => {
		await interaction.reply(`Current version: ${process.env.VERSION}`);
	},
};
