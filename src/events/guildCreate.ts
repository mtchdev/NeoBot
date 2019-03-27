import axios from 'axios';
import api_url from '../handlers/api';

class guildCreate {
    public guild_id: string = '0';
    public owner_id: string = '0';
    public data: any;

    constructor(guild: any) {
        this.guild_id = guild.id;
        this.owner_id = guild.ownerID;
        this.handle();
    }

    handle() {
        this.data = {
            owner_id: this.owner_id,
            guild_id: this.guild_id
        }
        axios.post(api_url+'guild/add', this.data).catch(err => {
            console.log(err)
        });
    }
}

export default guildCreate;