import { SlashCommandBuilder } from 'discord.js';

const disconnectMessages = ['Tiri titi titi!', 'Tiririn!', 'Tirurun!'];

const getRandomDisconnectMessage = () => disconnectMessages[Math.floor(Math.random() * disconnectMessages.length)];

export default {
	data: new SlashCommandBuilder().setName('stop').setDescription('Parar el bot!'),
	run: async (client, interaction) => {
		if (!client.isBotInRoom()) {
			await interaction.reply('El bot no se encuentra en ninguna sala');
			return;
		}

		const queue = client.distube.getQueue(interaction);
		if (!queue || queue.songs.length === 0) {
			interaction.reply('No hay canciones en la playlist');
			return;
		}

		client.distube.stop(interaction);
		await interaction.reply(getRandomDisconnectMessage());
	},
};
