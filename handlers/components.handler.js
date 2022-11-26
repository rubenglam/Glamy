import { Collection } from 'discord.js';
import { readdirSync } from 'fs';

const loadComponents = async client => {
	client.buttons = new Collection();
	try {
		const folders = readdirSync('./components');
		for (const folder of folders) {
			const componentFiles = readdirSync(`./components/${folder}`).filter(file => file.endsWith('.js'));
			const { buttons } = client;

			switch (folder) {
				case 'buttons':
					for (const file of componentFiles) {
						const button = (await import(`../components/${folder}/${file}`)).default;
						buttons.set(button.data.name, button);
					}
			}
		}
	} catch (error) {
		console.error(error);
	}
};

const configureComponents = async client => {
	console.log('Start loading components');
	await loadComponents(client);
	console.log('Successfully components loaded');
};

export { configureComponents };
