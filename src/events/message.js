const axios = require('axios');
const Route = require('../handlers/router');

module.exports = message => {
    if(!message.guild) return;

    var guildID = message.guild.id;

    axios.get('http://localhost:8000/guild/get', {headers:{guild_id:guildID}})
    .then(res => {
        if(!message.content.startsWith('!')) return;
        let params = message.content.split(' ').slice(1);
        const client = message.client;
        const args = message.content.split(' ');
        const cmd = args.shift().slice(res.data.prefix.length).toLowerCase();
        let prefix = res.data.prefix;

        // Checking

        if (cmd.length === 0) return;

        // Spawn
        let Router = new Route;
        Router.route(cmd, client, message, args);
        
        return;
    })
    .catch(err => {
        console.log(err);
        return;
    });
}