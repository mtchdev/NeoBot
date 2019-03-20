const axios = require('axios');

class Command {
    constructor(params = {}){
        this.name = params.name;
        this.info = params.info;
        this.usage = params.usage;
    }

    apiget(url, data) {
        return axios.get('http://localhost:8000/'+url, data);
    }

    apipost(url, data) {
        return axios.post('http://localhost:8000/'+url, data);
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
        message.channel.send('Usage: `'+usage+'`');
    }
}

module.exports = Command;