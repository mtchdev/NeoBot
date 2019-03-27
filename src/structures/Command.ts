import axios from 'axios';
import api_url from '../handlers/API';
import Logger from '../handlers/Logger';

class Command extends Logger {

    name: string;
    info: string;
    usage: string;
    category: string;

    constructor(params: any){
        super();
        this.name = params.name || '';
        this.info = params.info || '';
        this.usage = params.usage || '';
        this.category = params.category || 'All';
        
    }

    apiget(url: string, data: any) {
        Logger.prototype.log('API endpoint requested: (GET) '+url, 5);
        return axios.get(api_url+url, data);
    }

    apipost(url: string, data: any) {
        Logger.prototype.log('API endpoint post: (POST) '+url, 5);
        return axios.post(api_url+url, data);
    }

    async warn(msg: string, message: any) {
        message.delete();
        let mesg = await message.channel.send({embed: {
            color: 15158332,
            title: "Error",
            description: `⚠ ${msg}`
        }});

        mesg.delete(3500);
    }

    success(msg: string, message: any){
        message.channel.send({embed: {
            color: 3066993,
            title: "Success",
            description: `✅ ${msg}`
        }});
    }

    async cmdhelp(message: any) {
        let res = await axios.get(api_url+'guild/get', {headers:{guild_id:message.guild.id}});
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
                  "value": this.info+'.'
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

export default Command;