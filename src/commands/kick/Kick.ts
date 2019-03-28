import Command from '../../structures/Command';

class Kick extends Command {
    // !kick [user] [reason]

    message: any;
    client: any;
    args?: any;

    constructor(message: any, client: any, args: any[]){
        super({
            name: 'Kick',
            info: 'Kick a user from the guild',
            usage: 'kick [@user] [reason]',
            category: 'Moderation'
        }, message);

        this.kick = this.kick.bind(this);
        this.message = message;
        this.client = client;
        this.args = args;

        this.execute();
    }

    async execute() {

        if(['help', 'h'].indexOf(this.args[0])+1)
            return super.cmdhelp();
        
        if(!this.args[0])
            return super.warn('Please @mention a user to kick.');
        if(!this.args[1])
            return super.warn('Please specify a reason.');

        let user = this.message.mentions.members.first();
        let reason = this.args.slice(1).join(' ');

        if(!user.kickable)
            return super.warn('That user cannot be kicked!');

        await this.kick(this.message, user, reason);
    }
    async kick(message: any, user:any, reason: string) {
        let data = {
            guild_id: message.guild.id,
            user: user.id,
            actor: message.author.id,
            reason: reason
        }
        try {
            try {
                await user.send('You were kicked from '+message.guild.name+' for '+reason);
            } catch (err) {
                super.log('Failed to send message to target user', 3);
            }
            await user.kick(reason);
        } catch (err) {
            super.log('Failed to kick a user (insufficient permissions)', 3);
            return Command.prototype.warn('Failed to kick: insufficient permissions.');
        }
        let res = await super.apipost('kick/new', data);
        super.success('`[CASE #'+res.data.case+']` Kicked '+user+' for '+reason+'.');
    }

}

export default Kick;