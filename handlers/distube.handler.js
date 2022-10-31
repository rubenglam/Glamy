const { DisTube } = require('distube');

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
		// todo npm i @distube/spotify ...
		plugins: [
			// new SpotifyPlugin({
			// 	parallel: true,
			// })
		],
	});

	// Subscribe to DisTube events
	distube.on('playSong', (queue, songs) => {
		// !!!! TODO Fix displayed songName
		const queueSongs = songs.related;
		const songName = songs.related[queueSongs.length - 1].name;
		queue.textChannel.send(`Reproduciendo canción ${songName}`);
	});

	distube.on('addSong', (queue, song) => {
		queue.textChannel.send('Adding song');
	});

	client.distube = distube;
};

module.exports = { configureDistube };
