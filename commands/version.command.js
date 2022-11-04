const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder().setName('version').setDescription('Devuelve el número de versión'),
	run: async (client, interaction) => {
		const embedded = new EmbedBuilder().setTitle(`Versión ${process.env.VERSION}`).addFields({
			name: `BETA`,
			value: `Desarrollado por RubenGlam`,
		});
		interaction.reply({ embeds: [embedded] });
	},
};
