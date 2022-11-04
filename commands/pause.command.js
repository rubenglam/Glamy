const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder().setName('pause').setDescription('Pausar la canción en curso'),
	run: async (client, interaction) => {
		const queue = client.distube.getQueue(interaction);
		if (!queue) return interaction.reply('No se han añadido canciones');
		if (!queue.paused) {
			client.distube.pause(interaction);
			interaction.reply('Canción pausada');
		} else {
			interaction.reply('La canción ya ha sido pausada');
		}
	},
};
