import Command from '../../structures/Command';

class ForceBan extends Command {

    message: any;
    client: any;
    args?: any;

    constructor(message: any, client: any, args: any[]) {
        super({
            name: 'Forceban',
            info: 'Forcefully bans a user if they are inaccessible on the server',
            usage: 'forceban [id] [reason]',
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
            return super.warn('Please specify a user ID to ban.');
        if(!this.args[1])
            return super.warn('Please provide a reason.');
        if(this.args[0] == this.message.author.id)
            return super.warn('You cannot ban yourself!');

        let reason = this.args.slice(1).join(' ');

        await this.ban(this.message.guild.id, this.args[0], reason, this.message.author.id);

    }

    async ban(guild: any, user: string, reason: string, actor: any) {
        let data = {
            guild_id: guild,
            user: user,
            reason: reason,
            actor: actor
        }
        try {
            let guildUser = await this.client.fetchUser(user);
            await this.message.guild.ban(guildUser.id);
            let res = await super.apipost('ban/new', data);
            super.success('`[CASE #'+res.data.case+']` Forcebanned **'+guildUser.username+'#'+guildUser.discriminator+'** for '+reason);
        } catch (err) {
            super.log('An error occurred while forcebanning: '+err, 2);
            super.warn(err);
        }  
    } 
}

export default ForceBan;