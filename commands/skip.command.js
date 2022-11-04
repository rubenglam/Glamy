const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder().setName('skip').setDescription('Saltar a la siguiente canción de la lista de reproducción!'),
	run: async (client, interaction) => {
		client.distube.skip(interaction.guildId);
		interaction.reply('Canción saltada');
	},
};
