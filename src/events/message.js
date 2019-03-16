const settings = require('../settings.json')
const axios = require('axios');
const fs = require('fs');
const wMessage = require('../messages/warning');

module.exports = message => {
    if(!message.guild) return;

    var guildID = message.guild.id;

    axios.get('http://localhost:8000/guild/get', {headers:{guild_id:guildID}})
    .then(res => {
        if(!message.content.startsWith(res.data.prefix)) return;
        let params = message.content.split(' ').slice(1);
        const client = message.client;
        const args = message.content.split(' ');
        const cmd = args.shift().slice(res.data.prefix.length).toLowerCase();
        let prefix = res.data.prefix;

        // Checking

        if (cmd.length === 0) return;


        // Check if command file exists

        if (!fs.existsSync('./plugins/'+cmd+'/'+cmd+'.json')) {
            message.delete();
            wMessage(`${prefix}${cmd} is not a command.`, message);
            return;
        }


        // Run command

        let file = require(`../plugins/${cmd}/${cmd}.js`);
        file.run(message, client, args);
        
    })
    .catch(err => {
        console.log(err);
        return;
    });
}