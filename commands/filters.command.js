import { ActionRowBuilder, SelectMenuBuilder } from '@discordjs/builders';
import { SlashCommandBuilder } from 'discord.js';

const distubeFilters = [
	{
		label: 'NightCore',
		description: 'NightCore filter',
		value: 'nightcore',
	},
	{
		label: 'Reverse',
		description: 'Reverse filter',
		value: 'reverse',
	},
];

export default {
	data: new SlashCommandBuilder().setName('filters').setDescription('Aplicar un filtro a la canción actual'),
	run: async (client, interaction) => {
		if (!client.isBotInRoom()) {
			interaction.reply('El bot no se encuentra en ninguna sala');
			return;
		}

		const queue = client.distube.getQueue(interaction);
		if (!queue || queue.songs.length === 0) {
			interaction.reply('No hay canciones en la lista de reproducción');
			return;
		}

		const row = new ActionRowBuilder().addComponents(new SelectMenuBuilder().setCustomId('select').setPlaceholder('Ningún filtro seleccionado').addOptions(distubeFilters));
		interaction.reply({ content: 'Filtro aplicado', components: [row] });
	},
};
