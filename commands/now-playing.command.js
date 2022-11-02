const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder().setName('now-playing').setDescription('Show current song playing!'),
	run: async (client, interaction) => {
		const queue = client.distube.getQueue(interaction);
		if (!queue) interaction.reply('No songs on playlist');
		const song = queue.songs[0];
		if (!song) interaction.reply('No songs on playilist');
		interaction.reply(song.name);
	},
};
