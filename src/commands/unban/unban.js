const Command = require('../../structures/Command');

class Unban extends Command {

    constructor(){
        super({
            name: 'Unban',
            info: 'Unban a user from the guild. The user argument takes a user ID',
            usage: 'unban [uid]',
            category: 'Moderation'
        });
        
        this.unban = this.unban.bind(this);
    }

    async execute(message, client, args) {

        if(['help', 'h'].indexOf(args[0])+1)
            return super.cmdhelp(message);
        
        if(!args[0])
            return await Command.prototype.warn('Please enter a user ID to unban.', message);

        let user = args[0]
        if(typeof user == 'undefined')
            return await Command.prototype.warn('Please enter a valid user ID.', message);

        await this.unban(message.guild.id, user, message.author.id, message);
    }

    async unban(guild, user, actor, message) {
        try {
            let guildUser = await message.guild.unban(user);
            if(!guildUser)
                return await Command.prototype.warn('User isn\'t banned!', message);

            let data = {
                guild_id: guild,
                user: user,
                actor: actor
            }
            let res = await Command.prototype.apipost('ban/unban', data);
            Command.prototype.success('`[CASE #'+res.data.case+']` Unbanned '+guildUser.username+'#'+guildUser.discriminator+'.', message);
        } catch (err) {
            Command.prototype.warn('User isn\'t banned!', message);
        }

        return false;
    }

}

module.exports = Unban;