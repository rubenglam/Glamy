const { SlashCommandBuilder } = require('discord.js');

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

module.exports = {
	data: new SlashCommandBuilder()
		.setName('play')
		.setDescription('Playing song!')
		.addStringOption(option => option.setName('song').setDescription('Song name to reproduce').setRequired(true)),
	run: async (client, interaction) => {
		// check
		if (!interaction.member.voice.channel) return interaction.reply('You need to be in voice channel to use this command');

		// const queue = await client.player.createQueue(interaction.guild);
		// if (!queue.connection) await queue.connect(interaction.member.voice.channel);

		//let embed = new MessageEvent();

		// get params

		const songName = getSong(interaction);

		//const songName = '';
		const member = interaction.member;
		const voiceChannel = interaction.member.voice.channel;
		const textChannel = interaction.channel;

		// const message = interaction.message;
		// console.log(message);

		client.distube.play(voiceChannel, songName, {
			member,
			textChannel,
		});

		// if (interaction.options.getSubcommand() === 'song') {
		// 	const result = await client.player.se
		// } else if (interaction.options.getSubcommand() === 'playlist') {
		// } else if (interaction.options.getSubcommand() === 'search') {
		// }

		// check params
		// const options = interaction.options;
		// //console.log(options);

		// const songName = options.getString('song');
		// //console.log(songName);
		// // functionality

		// //console.log(message);
		// console.log(interaction.client.distube);

		interaction.reply(`Searching song... ${songName}`);
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
