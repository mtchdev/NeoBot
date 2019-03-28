import Command from '../../structures/Command';

class Unban extends Command {

    message: any;
    client: any;
    args?: any;

    constructor(message: any, client: any, args: any[]){
        super({
            name: 'Unban',
            info: 'Unban a user from the guild. The user argument takes a user ID',
            usage: 'unban [uid]',
            category: 'Moderation'
        }, message);

        this.message = message;
        this.client = client;
        this.args = args;
    }

    async execute() {
        if(!this.args[0])
            return await super.warn('Please enter a user ID to unban.');

        if(['help', 'h'].indexOf(this.args[0])+1)
            return super.cmdhelp();

        let user = this.args[0];
        let actor = this.message.author.id;
        let guild_id = this.message.guild.id;

        if(typeof user == 'undefined')
            return await super.warn('Please enter a valid user ID.');

        await this.unban(guild_id, user, actor);
    }

    async unban(guild_id: string, user: any, actor: string) {
        let data = {
            guild_id: guild_id,
            user: user,
            actor: actor
        }

        try {
            let guildUser = await this.message.guild.unban(user);

            if(!guildUser)
                return await super.warn('User isn\'t banned!');

            let res = await super.apipost('ban/unban', data);
            super.success('`[CASE #'+res.data.case+']` Unbanned '+guildUser.username+'#'+guildUser.discriminator+'.');
        } catch (err) {
            super.warn('User isn\'t banned!');
        }
    }

}

export default Unban;