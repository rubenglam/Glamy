const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { version } = require('../config.json');

module.exports = {
	data: new SlashCommandBuilder().setName('version').setDescription('Returns app version number'),
	run: async (client, interaction) => {
		const embedded = new EmbedBuilder().setTitle('Version').addFields({
			name: 'Current:',
			value: version,
		});
		interaction.reply({ embeds: [embedded] });
		//await interaction.reply(`Current version: ${version}`);
	},
};
