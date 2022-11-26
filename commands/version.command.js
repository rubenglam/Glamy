import { SlashCommandBuilder, EmbedBuilder } from 'discord.js';
import config from '../config.json' assert { type: 'json' };

export default {
	data: new SlashCommandBuilder().setName('version').setDescription('Devuelve el número de versión'),
	run: async (client, interaction) => {
		const embedded = new EmbedBuilder().setTitle(`Versión ${config.version}`).addFields({
			name: `BETA`,
			value: `Desarrollado por RubenGlam`,
		});
		interaction.reply({ embeds: [embedded] });
	},
};
