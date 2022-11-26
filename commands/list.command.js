import { EmbedBuilder } from '@discordjs/builders';
import { SlashCommandBuilder } from 'discord.js';

export default {
	data: new SlashCommandBuilder().setName('list').setDescription('Mostrar las canciones de la lista de reprodución'),
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

		const songs = queue.songs;
		const songsText = songs.map(song => song.name).join('\n');
		const embedded = new EmbedBuilder().setTitle(`Lista de reproducción`).addFields({
			name: `Cantidad: ${songs.length}`,
			value: `\n ${songsText}`,
		});
		interaction.reply({ embeds: [embedded] });
	},
};
