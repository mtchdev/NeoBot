const axios = require('axios');
const API = require('../handlers/api.js');

class Command  {
    constructor(params = {}){
        this.name = params.name;
        this.info = params.info;
        this.usage = params.usage;

        this.help = this.help.bind(this);
    }

    apiget(url, data) {
        return axios.get(API.api_url+url, data);
    }

    apipost(url, data) {
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

    help(message) {
        message.channel.send('Usage: `'+this.usage+'`');
    }
}

module.exports = Command;