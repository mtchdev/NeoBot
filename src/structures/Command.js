const axios = require('axios');
const API = require('../handlers/api.js');
const Logger = require('../handlers/logger.js');

class Command extends Logger {
    constructor(params = {}){
        super();
        this.name = params.name || '';
        this.info = params.info || '';
        this.usage = params.usage || '';
        this.category = params.category || 'All';
        
    }

    apiget(url, data) {
        Logger.prototype.log('API endpoint requested: (GET) '+url, 5);
        return axios.get(API.api_url+url, data);
    }

    apipost(url, data) {
        Logger.prototype.log('API endpoint post: (POST) '+url, 5);
        return axios.post(API.api_url+url, data);
    }

    warn(msg, message) {
        message.delete();
        message.channel.send({embed: {
            color: 15158332,
            title: "Error",
            description: `⚠ ${msg}`
        }}).then(msg =>{
            msg.delete(3500)
        });
    }

    success(msg, message){
        message.channel.send({embed: {
            color: 3066993,
            title: "Success",
            description: `✅ ${msg}`
        }});
    }

    async cmdhelp(message) {
        let res = await axios.get(API.api_url+'guild/get', {headers:{guild_id:message.guild.id}});
        let prefix = res.data.prefix;
        let embed = {
            "embed": {
              "description": "Find information for any command using `"+prefix+"[command] help`",
              "color": 6387150,
              "author": {
                "name": "Neo Command Help",
              },
              "fields": [
                {
                  "name": "Name",
                  "value": this.name
                },
                {
                  "name": "Description",
                  "value": this.info
                },
                {
                  "name": "Usage",
                  "value": '`'+prefix+this.usage+'`',
                  "inline": true
                },
                {
                  "name": "Category",
                  "value": this.category,
                  "inline": true
                }
              ]
            }
          }
        message.channel.send(embed);
    }
}

module.exports = Command;