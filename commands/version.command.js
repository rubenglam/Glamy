const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { version } = require('../config.json');

module.exports = {
	data: new SlashCommandBuilder().setName('version').setDescription('Devuelve el número de versión'),
	run: async (client, interaction) => {
		const embedded = new EmbedBuilder().setTitle(`Versión ${version}`).addFields({
			name: `BETA`,
			value: `Desarrollado por RubenGlam`,
		});
		interaction.reply({ embeds: [embedded] });
	},
};
