import { ActionRowBuilder, ButtonBuilder, EmbedBuilder } from '@discordjs/builders';
import { ButtonStyle, SlashCommandBuilder } from 'discord.js';

const getSong = interaction => {
	const paramSong = interaction.options.get('song');
	switch (paramSong.value) {
		case '1':
			return 'https://www.youtube.com/watch?v=s7cf7GE7kvE';
		case '2':
			return 'https://www.youtube.com/watch?v=FL1QjjkZVm4';
		default:
			return paramSong.value;
	}
};

export default {
	data: new SlashCommandBuilder()
		.setName('play')
		.setDescription('Escuchar canciones')
		.addStringOption(option => option.setName('song').setDescription('Nombre o enlace de la canción a reproducir').setRequired(true)),
	run: async (client, interaction) => {
		if (!client.isUserInRoom(interaction)) {
			interaction.reply('Necesitas estar en un canal de voz para usar este comando');
			return;
		}

		const songName = getSong(interaction);

		const member = interaction.member;
		const voiceChannel = interaction.member.voice.channel;
		const textChannel = interaction.channel;

		client.distube.play(voiceChannel, songName, {
			member,
			textChannel,
		});

		const embedded = new EmbedBuilder().setTitle(`Buscando canción`).setDescription(songName);
		interaction.reply({ embeds: [embedded] });
	},
	runButton: async (client, interaction, id) => {
		console.log(id);
	},
	runExample: async (client, interaction) => {
		if (!interaction.member.voice.channel) return interaction.editReply('You need to be in a VC to use this command');

		const queue = await client.player.createQueue(interaction.guild);
		if (!queue.connection) await queue.connect(interaction.member.voice.channel);

		let embed = new MessageEmbed();

		if (interaction.options.getSubcommand() === 'song') {
			let url = interaction.options.getString('url');
			const result = await client.player.search(url, {
				requestedBy: interaction.user,
				searchEngine: QueryType.YOUTUBE_VIDEO,
			});
			if (result.tracks.length === 0) return interaction.editReply('No results');

			const song = result.tracks[0];
			await queue.addTrack(song);
			embed
				.setDescription(`**[${song.title}](${song.url})** has been added to the Queue`)
				.setThumbnail(song.thumbnail)
				.setFooter({ text: `Duration: ${song.duration}` });
		} else if (interaction.options.getSubcommand() === 'playlist') {
			let url = interaction.options.getString('url');
			const result = await client.player.search(url, {
				requestedBy: interaction.user,
				searchEngine: QueryType.YOUTUBE_PLAYLIST,
			});

			if (result.tracks.length === 0) return interaction.editReply('No results');

			const playlist = result.playlist;
			await queue.addTracks(result.tracks);
			embed.setDescription(`**${result.tracks.length} songs from [${playlist.title}](${playlist.url})** have been added to the Queue`).setThumbnail(playlist.thumbnail);
		} else if (interaction.options.getSubcommand() === 'search') {
			let url = interaction.options.getString('searchterms');
			const result = await client.player.search(url, {
				requestedBy: interaction.user,
				searchEngine: QueryType.AUTO,
			});

			if (result.tracks.length === 0) return interaction.editReply('No results');

			const song = result.tracks[0];
			await queue.addTrack(song);
			embed
				.setDescription(`**[${song.title}](${song.url})** has been added to the Queue`)
				.setThumbnail(song.thumbnail)
				.setFooter({ text: `Duration: ${song.duration}` });
		}
		if (!queue.playing) await queue.play();
		await interaction.editReply({
			embeds: [embed],
		});
	},
};
