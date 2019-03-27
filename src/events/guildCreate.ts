import axios from 'axios';
import api_url from '../handlers/api';
import Logger from '../handlers/logger';

class guildCreate {
    public guild_id: string = '0';
    public owner_id: string = '0';
    public data: any;

    constructor(guild: any) {
        this.guild_id = guild.id;
        this.owner_id = guild.ownerID;
        this.handle();
    }

    async handle() {
        this.data = {
            owner_id: this.owner_id,
            guild_id: this.guild_id
        }
        try {
            await axios.post(api_url+'guild/add', this.data);
        } catch (e) {
            new Logger().log('Unable to create guild data for '+this.guild_id, 2);
        }
    }
}

export default guildCreate;