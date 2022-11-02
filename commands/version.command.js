const { SlashCommandBuilder } = require('discord.js');
const { version } = require('../config.json');

module.exports = {
	data: new SlashCommandBuilder().setName('version').setDescription('Returns app version number'),
	run: async (client, interaction) => {
		await interaction.reply(`Current version: ${version}`);
	},
};
