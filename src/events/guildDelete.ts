import axios from 'axios';
import api_url from '../handlers/API';
import Logger from '../handlers/Logger';

class guildDelete {
    public guildID: string;

    constructor(guild: any) {
        this.guildID = guild.id;
        this.handle();
    }

    async handle() {
        try {
            await axios.post(api_url+'guild/remove', {guild_id:this.guildID});
        } catch (e) {
            new Logger().log('An error occurred while removing a guild ('+this.guildID+'): '+e, 2);
        }
    }
}

export default guildDelete;