const axios = require('axios');
const API = require('../handlers/api.js');
const Logger = require('../handlers/logger.js');

class Command extends Logger {
    constructor(params = {}){
        super();
        this.name = params.name || '';
        this.info = params.info || '';
        this.usage = params.usage || '';
        
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

    get cmdhelp() {
        let embed = {
            "embed": {
              "description": "Find information for any command using `[command] help`!",
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
                  "value": '`'+this.usage+'`',
                  "inline": true
                },
                {
                  "name": "Category",
                  "value": "Moderation",
                  "inline": true
                }
              ]
            }
          }
        return embed;
    }
}

module.exports = Command;