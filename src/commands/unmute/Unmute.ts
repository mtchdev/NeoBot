import Command from '../../structures/Command';

class Unmute extends Command {
    // !unmute [user]

    message: any;
    client: any;
    args?: any;
    
    constructor(message: any, client: any, args:any[]){
        super({
            name: 'Unmute',
            info: 'Unmute a user',
            usage: 'unmute [@user]',
            category: 'Moderation'
        }, message);

        this.unmute = this.unmute.bind(this);
        this.message = message;
        this.client = client;
        this.args = args;

        this.execute();
    }

    async execute(){

        if(!this.args[0])
            return super.warn('Please provide a user to unmute.');

        if(['help', 'h'].indexOf(this.args[0])+1)
            return super.cmdhelp();
    
        let user = this.message.mentions.members.first();
        try {
            let res = await super.apiget('config/roles/muted/get', {headers:{guild_id:this.message.guild.id}});
            if(!user.roles.has(res.data.role))
                return super.warn('User is not muted!');
            if(user.id == this.message.author.id)
                return super.warn('You cannot unmute yourself.');
            await this.unmute(this.message.guild.id, user, this.message.author.id, res);
        } catch (err) {
            super.warn(err);
            return;
        }
    } 

    async unmute(guild: any, user: any , actor: string, res: any) {
        let data = {
            guild_id: guild,
            user: user.id,
            actor: actor
        }

        try {
            let resp = await super.apipost('mute/unmute', data);
            user.removeRole(res.data.role);
                super.success('`[CASE #'+resp.data.case+']` Unmuted **'+user.user.username+'#'+user.user.discriminator+'**.');
            try {
                user.send(`You were unmuted on ${this.message.guild.name}.`);
            } catch (err) {
                super.log('Failed to send message to target user', 3);
            }
        } catch (err) {
            super.log('An error occurred while unmuting: '+err, 2);
            super.warn(err);
            return;
        }

        return false;
    }

}

export default Unmute;