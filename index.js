import { configureCommands } from './handlers/commands.handler.js';
import { configureDistube } from './handlers/distube.handler.js';
import { configureEvents } from './handlers/events.handler.js';
import { createClient, loginClient } from './models/discordClient.js';
import { configureComponents } from './handlers/components.handler.js';

const client = createClient();

configureDistube(client);
configureEvents(client);

//await configureComponents(client);
await configureCommands(client);

loginClient(client);
