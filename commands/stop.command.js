const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder().setName('stop').setDescription('Stop the current queue songs!'),
	run: async (client, interaction) => {
		const guildId = interaction.guildId;
		client.distube.stop(guildId);
		await interaction.reply('Tiri ti ti!');
	},
};
