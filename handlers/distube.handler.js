import { DisTube } from 'distube';
import { SpotifyPlugin } from '@distube/spotify';
import { SoundCloudPlugin } from '@distube/soundcloud';
import { YtDlpPlugin } from '@distube/yt-dlp';
import { ActionRowBuilder, ButtonBuilder, EmbedBuilder } from '@discordjs/builders';
import { ButtonStyle } from 'discord.js';

const configureDistube = client => {
	const distube = new DisTube(client, {
		emitNewSongOnly: false,
		leaveOnEmpty: true,
		leaveOnFinish: true,
		leaveOnStop: true,
		savePreviousSongs: true,
		emitAddSongWhenCreatingQueue: false,
		searchSongs: 0,
		nsfw: false,
		emptyCooldown: 25,
		ytdlOptions: {
			highWaterMark: 1024 * 1024 * 64,
			quality: 'highestaudio',
			format: 'audionly',
			liveBuffer: 60000,
			dlChunkSize: 1024 * 1024 * 4,
		},
		// youtubeDL: false,
		plugins: [
			new SpotifyPlugin({
				parallel: true,
				emitEventsAfterFetching: false,
				// api: {
				// 	clientId: process.env.SPOTIFY_CLIENT_ID,
				// 	clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
				// },
			}),
			// new SoundCloudPlugin(),
			// new YtDlpPlugin(),
		],
	});

	// Subscribe to DisTube events
	distube.on('playSong', (queue, song) => {
		console.log(song);
		const embedded = new EmbedBuilder()
			.setTitle(`Escuchando`)
			.setColor(0x0099ff)
			.addFields({
				name: song.name,
				value: `Por ${song.uploader.name}`,
			})
			.addFields({
				name: 'Duration',
				value: song.formattedDuration,
			})
			.setThumbnail(song.thumbnail);
		const row = new ActionRowBuilder().addComponents([
			new ButtonBuilder().setCustomId('repeat').setLabel('Repeat').setStyle(ButtonStyle.Secondary),
			new ButtonBuilder().setCustomId('pause').setLabel('Pause').setStyle(ButtonStyle.Secondary),
			new ButtonBuilder().setCustomId('next').setLabel('Next').setStyle(ButtonStyle.Secondary),
		]);
		queue.textChannel.send({ embeds: [embedded], components: [row] });
	});

	distube.on('addSong', (queue, song) => {
		queue.textChannel.send('Adding song');
	});

	client.distube = distube;
};

export { configureDistube };
