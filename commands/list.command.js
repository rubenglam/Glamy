const { SlashCommandBuilder } = require('discord.js');

const getSongsText = queue => {
	const songs = queue.songs;
	let text = '';
	songs.forEach(song => {
		text += '· ' + song.name + '\n';
	});
	return text;
};

module.exports = {
	data: new SlashCommandBuilder().setName('list').setDescription('List songs on queue!'),
	run: async (client, interaction) => {
		const queue = client.distube.getQueue(interaction);
		if (!queue) interaction.reply('No songs on playlist');
		const songsText = getSongsText();
		interaction.reply(`Songs on playlist: ${songs.length} \n${songsText}`);
	},
};
