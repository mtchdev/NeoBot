const Command = require('../../structures/Command');

class Ban extends Command {

    constructor() {
        super({
            name: 'Ban',
            info: 'Ban a user',
            usage: 'Ban [user] [reason]'
        });

        this.ban = this.ban.bind(this);
    }

    async execute(message, client, args) {
        if(!args[0])
            return Command.prototype.warn('Please @mention a user to ban.', message);
        if(!args[1])
            return Command.prototype.warn('Please enter a reason.', message);
        
        let user = message.mentions.members.first();
        let reason = args.slice(1).join(' ');

        if(!user)
            return Command.prototype.warn('Please @mention a valid user to ban.', message);
        if(!user.bannable)
            return Command.prototype.warn('That user cannot be banned.', message);
        if(user.id == message.author.id)
            return Command.prototype.warn('You cannot ban yourself!', message);

        await this.ban(message.guild.id, user, reason, message);
    }

    async ban(guild, user, reason, message) {
        let data = {
            guild: guild,
            user: user.id,
            reason: reason,
            actor: message.author.id
        }

        try {
            try {
                user.send('You were banned on '+message.guild.name+' for '+reason);
            } catch (e) {
                // could not message user
            }
            await user.ban(reason);
            let res = await Command.prototype.apipost('ban/new', data);
            Command.prototype.success('`[CASE #'+res.data.case+']` Banned '+user+' for '+reason, message);
        } catch (err) {
            Command.prototype.warn(err, message);
        }
    }

}

module.exports = Ban;