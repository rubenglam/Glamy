import { Events } from 'discord.js';

const executeComponents = async () => {
	const { buttons } = client;
	const { customId } = interaction;
	const button = buttons.get(customId);
	if (!button) return;

	try {
		await command.run(client, interaction);
	} catch (error) {
		console.error(`Error executing ${interaction.commandName}`);
		console.error(error);
	}
};

const executeCommand = async (client, interaction) => {
	const command = interaction.client.commands.get(interaction.commandName);
	if (!command) {
		console.error(`No command matching ${interaction.commandName} was found.`);
		return;
	}

	try {
		await command.run(client, interaction);
	} catch (error) {
		console.error(`Error executing ${interaction.commandName}`);
		console.error(error);
	}
};

export default {
	name: Events.InteractionCreate,
	run: async (client, interaction) => {
		await executeCommand(client, interaction);
		// console.log('interactioncreate', interaction);
		// if (interaction.isButton()) {
		// 	await executeComponents();
		// } else if (interaction.isChatInputCommand()) {

		// }
	},
};
