const { EmbedBuilder } = require('@discordjs/builders');
const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder().setName('now-playing').setDescription('Show current song playing!'),
	run: async (client, interaction) => {
		const queue = client.distube.getQueue(interaction);
		if (!queue) interaction.reply('No songs on playlist');

		const song = queue.songs[0];
		if (!song) interaction.reply('No songs on playilist');

		console.log(song);

		const embedded = new EmbedBuilder().setTitle(`Escuchando`).addFields({
			name: song.name,
			value: `Por ${song.uploader.name}`,
		});
		interaction.reply({ embeds: [embedded] });
	},
};
