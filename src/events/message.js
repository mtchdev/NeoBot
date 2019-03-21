const axios = require('axios');
const Route = require('../handlers/router');
const API = require('../handlers/api.js');
const Logger = require('../handlers/logger');

module.exports = message => {
    if(!message.guild) return;
    if(message.author.bot) return;

    var guildID = message.guild.id;

    axios.get(API.api_url+'guild/get', {headers:{guild_id:guildID}})
    .then(res => {
        new Logger().log('API endpoint requested: (GET) '+'guild/get', 5);
        if(!message.content.startsWith('!')) return;
        let params = message.content.split(' ').slice(1);
        const client = message.client;
        const args = message.content.split(' ');
        const cmd = args.shift().slice(res.data.prefix.length).toLowerCase();
        let prefix = res.data.prefix;

        // Checking

        if (cmd.length == 0) return;

        new Logger().log('Command received: '+cmd+'. Spawning worker...', 4);

        // Spawn
        new Route().route(cmd, client, message, args);
        
        return;
    })
    .catch(err => {
        new Logger().log('General error: '+err, 1);
        return;
    });
}