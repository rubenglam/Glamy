import { SlashCommandBuilder } from 'discord.js';

export default {
	data: new SlashCommandBuilder().setName('pause').setDescription('Pausar la canción en reproducción'),
	run: async (client, interaction) => {
		if (!client.isBotInRoom()) {
			interaction.reply('El bot no se encuentra en ninguna sala');
			return;
		}

		const queue = client.distube.getQueue(interaction);
		if (!queue || queue.length === 0) {
			interaction.reply('No se han añadido canciones');
			return;
		}

		if (!queue.paused) {
			client.distube.pause(interaction);
			interaction.reply('Canción pausada');
		} else {
			interaction.reply('La canción ya ha sido pausada');
		}
	},
};
