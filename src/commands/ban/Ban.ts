import Command from '../../structures/Command';

class Ban extends Command {

    message: any;
    client: any;
    args?: any;

    constructor(message: any, client: any, args: any[]) {
        super({
            name: 'Ban',
            info: 'Ban a user from the guild',
            usage: 'ban [@user] [reason]',
            category: 'Moderation'
        }, message);

        this.message = message;
        this.client = client;
        this.args = args;

        this.execute();
    }

    async execute() {

        if(['help', 'h'].indexOf(this.args[0])+1)
            return super.cmdhelp();
        
        if(!this.args[0])
            return super.warn('Please @mention a user to ban.');
        if(!this.args[1])
            return super.warn('Please enter a reason.');
        
        let user = this.message.mentions.members.first();
        let reason = this.args.slice(1).join(' ');

        if(!user)
            return super.warn('Please @mention a valid user to ban.');
        if(!user.bannable)
            return super.warn('That user cannot be banned');
        if(user.id == this.message.author.id)
            return super.warn('You cannot ban yourself!');

        await this.ban(this.message.guild.id, user, reason);
    }

    async ban(guild: any, user: any, reason: string) {
        try {
            let data = {
                guild: guild,
                user: user.id,
                reason: reason,
                actor: this.message.author.id
            }
            try {
                try {
                    await user.send('You were banned on '+this.message.guild.name+' for '+reason);
                } catch (e) {
                    super.log('Failed to send this.message to target user', 3);
                }
                await user.ban(reason);
            } catch (err) {
                super.log('Unable to ban: insufficient permissions', 3);
                super.warn('Failed to ban: insufficient permissions.');
            }
            let res = await super.apipost('ban/new', data);
            super.success('`[CASE #'+res.data.case+']` Banned '+user+' for '+reason);
        } catch (err) {
            super.log('An error occurred while banning: '+err, 2);
            super.warn(err);
        }
    }
}

export default Ban;