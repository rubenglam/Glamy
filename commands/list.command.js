const { EmbedBuilder } = require('@discordjs/builders');
const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder().setName('list').setDescription('Mostrar las canciones en la lista de reprodución!'),
	run: async (client, interaction) => {
		const queue = client.distube.getQueue(interaction);
		if (!queue) interaction.reply('No hay canciones en la lista de reproducción');

		const songs = queue.songs;
		const songsText = songs.map(song => song.name).join('\n');

		const embedded = new EmbedBuilder().setTitle(`Lista de reproducción`).addFields({
			name: `Cantidad: ${songs.length}`,
			value: `\n ${songsText}`,
		});
		interaction.reply({ embeds: [embedded] });
	},
};
