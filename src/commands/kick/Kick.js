const Command = require('../../structures/Command');

class Kick extends Command {

    constructor(){
        super({
            name: 'Kick',
            info: 'Kick a user from the server',
            usage: 'kick [user] [reason]'
        });

        this.kick = this.kick.bind(this);
    }

    async execute(message, client, args) {
        if(!args[0])
            return Command.prototype.warn('Please @mention a user to kick.', message);
        if(!args[1])
            return Command.prototype.warn('Please specify a reason.', message);

        let user = message.mentions.members.first();
        let reason = args.slice(1).join(' ');

        await this.kick(message, user, reason);
    }

    async kick(message, user, reason) {
        // TODO: kick user
        try {
            let data = {
                guild_id: message.guild.id,
                user: user.id,
                actor: message.author.id,
                reason: reason
            }
            try {
                await user.kick(reason);
            } catch (err) {
                return Command.prototype.warn('Failed to kick: insufficient permissions.', message);
            }
            try {
                user.send('You were kicked from '+message.guild.name+' for '+reason);
            } catch (e) {
                // could not message user
            }
            let res = await Command.prototype.apipost('kick/new', data);
            Command.prototype.success('`[CASE #'+res.data.case+']` Kicked '+user+' for '+reason, message);
        } catch (err) {
            return Command.prototype.warn('User not found.', message);
        }
    }

}

module.exports = Kick;