const Discord = require('discord.js');
const client = new Discord.Client();
const settings = require('./settings.json');
require('./events/_handler')(client);

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.login(settings.token);