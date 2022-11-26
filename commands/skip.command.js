import { SlashCommandBuilder } from 'discord.js';

export default {
	data: new SlashCommandBuilder().setName('skip').setDescription('Saltar a la siguiente canción de la lista de reproducción!'),
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

		if (queue.songs.length === 1) {
			client.distube.stop(interaction.guildId);
			interaction.reply('Se han acabado las canciones de la lista de reproducción');
			return;
		}

		client.distube.skip(interaction.guildId);
		interaction.reply('La canción se ha saltado');
	},
};
