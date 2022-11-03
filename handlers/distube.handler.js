const { DisTube } = require('distube');
const { SpotifyPlugin } = require('@distube/spotify');
const { SoundCloudPlugin } = require('@distube/soundcloud');
const { YtDlpPlugin } = require('@distube/yt-dlp');

const configureDistube = client => {
	const distube = new DisTube(client, {
		emitNewSongOnly: false,
		leaveOnEmpty: false,
		leaveOnFinish: false,
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
				emitEventsAfterFetching: true,
			}),
			new SoundCloudPlugin(),
			new YtDlpPlugin(),
		],
	});

	// Subscribe to DisTube events
	distube.on('playSong', (queue, song) => {
		queue.textChannel.send(`Reproduciendo canción ${song.name}`);
	});
	distube.on('addSong', (queue, song) => {
		queue.textChannel.send('Adding song');
	});

	client.distube = distube;
};

module.exports = { configureDistube };
