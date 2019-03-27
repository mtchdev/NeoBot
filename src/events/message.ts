import axios from 'axios';
import Router from '../handlers/Router';
import api_url from '../handlers/API';

class Message {
    public message: any;
    public guildID: string = '0';
    public prefix: string = '!';
    public client: any;
    public args?: any;
    public cmd?: string = '';

    constructor(message: any) {
        this.message = message;
        this.client = message.client;
        this.guildID = message.guild.id;
        this.args = message.content.split(' ');
        this.handle();
    }

    async handle() {
        try {
            let res = await axios.get(api_url+'guild/get', {headers:{guild_id:this.guildID}});
            this.prefix = res.data.prefix;
            this.cmd = this.args.shift().slice(res.data.prefix.length).toLowerCase();

            new Router(this.cmd, this.client, this.message, this.args);
        } catch (e) {
            console.log(e);
        }
    }
}

export default Message;