const configureBotUtils = client => {
	client.isBotInRoom = () => client.voice.adapters.size > 0;
	client.isUserInRoom = interaction => interaction.member.voice.channel;
};

export { configureBotUtils };
