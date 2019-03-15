const settings = require('../settings.json')
const axios = require('axios');
const fs = require('fs');

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

        
        // Check if command file exists

        if (!fs.existsSync('./plugins/'+cmd+'/'+cmd+'.json')) {
            message.delete();
            message.reply(`\`${res.data.prefix}${cmd}\` is not a command.`)
            return;
        }
        
    })
    .catch(err => {
        console.log(err);
        return;
    });
}