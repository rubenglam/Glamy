import fs from 'fs';
import path from 'path';

const eventsPath = path.join(process.cwd(), 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(fileName => fileName.endsWith('.event.js'));

const configureEvents = async client => {
	try {
		for (const eventFile of eventFiles) {
			const event = (await import(`../events/${eventFile}`)).default;
			if (event.once) {
				client.once(event.name, async (...args) => await event.run(client, ...args));
			} else {
				client.on(event.name, async (...args) => await event.run(client, ...args));
			}
		}
	} catch (error) {
		console.error(error);
	}
};

export { configureEvents };
