const fs = require('fs');
const path = require('path');

const eventsPath = path.join(process.cwd(), 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(fileName => fileName.endsWith('.event.js'));

const configureEvents = client => {
	try {
		eventFiles.forEach(file => {
			const filePath = path.join(process.cwd(), 'events', file);
			const event = require(filePath);
			if (event.once) {
				client.once(event.name, async (...args) => await event.run(client, ...args));
			} else {
				client.on(event.name, async (...args) => await event.run(client, ...args));
			}
		});
	} catch (error) {
		console.error(error);
	}
};

module.exports = { configureEvents };
