const axios = require('axios');
const API = require('../handlers/api.js');
const Logger = require('../handlers/logger.js');

class Command extends Logger {
    constructor(params = {}){
        super();
        this.name = params.name;
        this.info = params.info;
        this.usage = params.usage;

        this.help = this.help.bind(this);
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

    help(msg, message) {
        message.channel.send({embed: {
            color: 20735,
            title: "Help",
            description: 'ℹ️ Usage: `'+msg+'`'
        }});
    }
}

module.exports = Command;