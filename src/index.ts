import * as Discord from 'discord.js';
const client = new Discord.Client();
import {token} from './settings';
import EventHandler from './handlers/EventHandler';
import Logger from './handlers/logger';

new EventHandler(client);

client.on('ready', () => {
  new Logger().log('Bot online as '+client.user.tag, 4);
});

client.login(token);