const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder().setName('resume').setDescription('Reanudar la canción'),
	run: async (client, interaction) => {
		const queue = client.distube.getQueue(interaction);
		if (!queue) return interaction.reply('Ninguna canción añadida');
		if (queue.paused) {
			queue.resume();
			interaction.reply('Canción reanudada');
		} else {
			interaction.reply('La canción ya se está escuchando');
		}
	},
};
