const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder().setName('skip').setDescription('Skip current song!'),
	run: async (client, interaction) => {
		client.distube.skip(interaction.guildId);
		interaction.reply('Song skipped!');
	},
};
