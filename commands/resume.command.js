const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder().setName('resume').setDescription('Resume the current song!'),
	run: async (client, interaction) => {
		const queue = client.distube.getQueue(interaction);
		if (!queue) return interaction.reply('No songs added');
		if (queue.paused) {
			queue.resume();
			interaction.reply('Song resumed');
		} else {
			interaction.reply('Song already resumed');
		}
	},
};
