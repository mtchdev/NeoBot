import Command from '../../structures/Command';

class Warn extends Command {
    // !warn [user] [reason]

    guild_id: any;
    user: any;
    reason?: string = '';
    actor: any;

    constructor(message: any, client: any, args: any[]){
        super({
            name: 'Warn',
            info: 'Warn a user on the server.',
            usage: 'warn [user] [reason]',
            category: 'Moderation'
        }, message);

        this.execute(message, client, args);
    }

    async execute(message: any, client: any, args: any[]){
        if(!args[0])
        return super.warn('Please provide a user to warn.');

        if(['help', 'h'].indexOf(args[0])+1)
            return super.cmdhelp(message);
        
        if(!args[1])
            return super.warn('Please provide a reason.');

        this.reason = args.slice(1).join(' ');
        this.user = message.mentions.members.first();
        this.actor = message.author.id;
        this.guild_id = message.guild.id;

        if(typeof this.user == 'undefined')
            return super.warn('Please @mention a user on this server to warn.');
            
        if(this.user.id == message.author.id)
            return super.warn('You cannot warn yourself!');

        await this.warnUser(message);       
    }

    async warnUser(message: any){
        let data = {
            guild_id: this.guild_id,
            user: this.user.id,
            reason: this.reason,
            actor: this.actor
        }

        try {
            let res = await super.apipost('warn/new', data);
            if(res.data.message !== 200) return;
            super.success('`[CASE #'+res.data.case+']`Warned '+this.user+' for '+this.reason);
            try {
                await this.user.send(`You were warned on ${message.guild.name}: ${this.reason}`);
            } catch (err) {
                super.log('Failed to send message to target user', 3);
            }
        } catch (err) {
            super.log('An error occurred while warning: '+err, 2);
            super.warn(err);
        }
    }

}

export default Warn;