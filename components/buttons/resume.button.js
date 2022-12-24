import { SlashCommandBuilder } from 'discord.js';

export default {
	data: {
		name: 'resume',
	},
	run: async (client, interaction) => {
		if (!client.isBotInRoom()) {
			interaction.reply('El bot no se encuentra en ninguna sala');
			return;
		}

		const queue = client.distube.getQueue(interaction);
		if (!queue || queue.songs.length === 0) {
			interaction.reply('Ninguna canción añadida');
			return;
		}

		if (queue.paused) {
			queue.resume();
			interaction.reply('Canción reanudada');
		} else {
			interaction.reply('La canción ya se está escuchando');
		}
	},
};
