const Discord = require('discord.js');
const client = new Discord.Client();
const settings = require('./settings.json');
const Logger = require('./handlers/logger');

require('./events/_handler')(client);

client.on('ready', () => {
  new Logger().log('Bot online as '+client.user.tag, 4);
});

client.login(settings.token);