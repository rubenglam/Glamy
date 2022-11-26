import { EmbedBuilder } from '@discordjs/builders';
import { SlashCommandBuilder } from 'discord.js';

export default {
	data: new SlashCommandBuilder().setName('nowplaying').setDescription('Mostrar la canción que esta reproduciendose'),
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

		const song = queue.songs[0];
		const embedded = new EmbedBuilder().setTitle(`Escuchando`).addFields({
			name: song.name,
			value: `Por ${song.uploader.name}`,
		});
		const row = new ActionRowBuilder().addComponents([
			new ButtonBuilder().setCustomId('repeat').setLabel('Repeat').setStyle(ButtonStyle.Secondary),
			new ButtonBuilder().setCustomId('pause').setLabel('Pause').setStyle(ButtonStyle.Secondary),
			new ButtonBuilder().setCustomId('next').setLabel('Next').setStyle(ButtonStyle.Secondary),
		]);
		interaction.reply({ embeds: [embedded], components: [row] });
	},
};
