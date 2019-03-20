const Command = require('../../structures/Command');

class Forceban {

    constructor() {
        super({
            name: 'Forceban',
            info: 'Forcefully bans a user if they are inaccessable on the server.',
            usage: 'forceban [id] [reason]'
        });

        this.ban = this.ban.bind(this);
    }

    async execute(message, client, args) {

        if(!args[0])
            return Command.prototype.warn('Please specify a user ID to ban.', message);
        if(!args[1])
            return Command.prototype.warn('Please provide a reason.', message);
        if(args[0] == message.author.id)
            return Command.prototype.warn('You cannot ban yourself!', message);

        let reason = args.slice(1).join(' ');

        await this.ban(message.guild.id, args[0], reason, message.author.id, message, client);

    }

    async ban(guild, user, reason, actor, message, client) {
        try {
            let guildUser = await client.fetchUser(user);
            await message.guild.ban(guildUser.id);
            let data = {
                guild_id: guild,
                user: user,
                reason: reason,
                actor: actor
            }
            let res = Command.prototype.apipost('ban/new', data);
            Command.prototype.success('`[CASE #'+res.data.case+']` Forcebanned **'+guildUser.username+'#'+guildUser.discriminator+'** for '+reason, message);
        } catch (err) {
            Command.prototype.warn(err, message);
        }  
    } 
}

module.exports = Forceban;