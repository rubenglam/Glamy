const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder().setName('pause').setDescription('Pause the current song!'),
	run: async (client, interaction) => {
		const queue = client.distube.getQueue(interaction);
		if (!queue) return interaction.reply('No songs added');
		if (!queue.paused) {
			client.distube.pause(interaction);
			interaction.reply('Songs paused');
		} else {
			interaction.reply('Songs already paused');
		}
	},
};
