const { SlashCommandBuilder } = require('discord.js');

const disconnectMessages = ['Tiri titi titi!', 'Tiririn!', 'Tirurun!'];

const getRandomDisconnectMessage = () => disconnectMessages[Math.floor(Math.random() * disconnectMessages.length)];

module.exports = {
	data: new SlashCommandBuilder().setName('stop').setDescription('Parar el bot!'),
	run: async (client, interaction) => {
		client.distube.stop(interaction.guildId);
		await interaction.reply(getRandomDisconnectMessage());
	},
};
