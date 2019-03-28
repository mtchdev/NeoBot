import Command from '../../structures/Command';

class Warn extends Command {
    // !warn [user] [reason]

    message: any;
    client: any;
    args?: any;

    constructor(message: any, client: any, args: any[]){
        super({
            name: 'Warn',
            info: 'Warn a user on the server.',
            usage: 'warn [user] [reason]',
            category: 'Moderation'
        }, message);

        this.message = message;
        this.client = client;
        this.args = args;

        this.execute();
    }

    async execute(){
        if(!this.args[0])
        return super.warn('Please provide a user to warn.');

        if(['help', 'h'].indexOf(this.args[0])+1)
            return super.cmdhelp();
        
        if(!this.args[1])
            return super.warn('Please provide a reason.');

        let reason = this.args.slice(1).join(' ');
        let user = this.message.mentions.members.first();
        let actor = this.message.author.id;
        let guild_id = this.message.guild.id;

        if(typeof user == 'undefined')
            return super.warn('Please @mention a user on this server to warn.');
            
        if(user.id == this.message.author.id)
            return super.warn('You cannot warn yourself!');

        await this.warnUser(guild_id, user, reason, actor);       
    }

    async warnUser(guild_id: string, user: any, reason: string, actor: string){
        let data = {
            guild_id: guild_id,
            user: user.id,
            reason: reason,
            actor: actor
        }

        try {
            let res = await super.apipost('warn/new', data);
            if(res.data.message !== 200) return;
            super.success('`[CASE #'+res.data.case+']`Warned '+user+' for '+reason);
            try {
                await user.send(`You were warned on ${this.message.guild.name}: ${reason}`);
            } catch (err) {
                super.log('Failed to send message to target user', 3);
            }
        } catch (err) {
            super.log('Tried to warn: '+err, 2);
            super.warn(err);
        }
    }

}

export default Warn;