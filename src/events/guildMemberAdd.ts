import axios from 'axios';
import api_url from '../handlers/api';
import Logger from '../handlers/logger';

class guildMemberAdd {
    public userID: number;
    public member: any;

    constructor(member: any) {
        this.member = member;
        this.userID = member.user.id;
        this.handle();
    }

    async handle() {
        try {
            let res = await axios.get(api_url+'mute/get', {headers:{user_id:this.userID}});
            if(res.data.data == null) return;
            try {
                let resp = await axios.get(api_url+'config/roles/muted/get', {headers:{guild_id:this.member.guild.id}});
                if(resp.data.role !== null) {
                    this.member.addRole(resp.data.role)
                }
            } catch (e) {
                new Logger().log('Failed to get mute metadata', 2);
            }
        } catch (e) {
            new Logger().log('Failed to check mutes for user', 2);
        }
    }
}

export default guildMemberAdd;