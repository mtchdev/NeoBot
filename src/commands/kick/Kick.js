const Command = require('../../structures/Command');

class Kick extends Command {

    constructor(){
        super({
            name: 'Kick',
            info: 'Kick a user from the server',
            usage: 'kick [user] [reason]',
            category: 'Moderation'
        });

        this.kick = this.kick.bind(this);
    }

    async execute(message, client, args) {

        if(['help', 'h'].indexOf(args[0])+1)
            return super.cmdhelp(message);
        
        if(!args[0])
            return Command.prototype.warn('Please @mention a user to kick.', message);
        if(!args[1])
            return Command.prototype.warn('Please specify a reason.', message);

        let user = message.mentions.members.first();
        let reason = args.slice(1).join(' ');

        if(!user.kickable)
            return Command.prototype.warn('That user cannot be kicked!', message);

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
                try {
                    await user.send('You were kicked from '+message.guild.name+' for '+reason);
                } catch (err) {
                    Command.prototype.log('Failed to send message to target user', 3);
                }
                await user.kick(reason);
            } catch (err) {
                Command.prototype.log('Failed to kick a user (insufficient permissions)', 3);
                return Command.prototype.warn('Failed to kick: insufficient permissions.', message);
            }
            let res = await Command.prototype.apipost('kick/new', data);
            Command.prototype.success('`[CASE #'+res.data.case+']` Kicked '+user+' for '+reason, message);
        } catch (err) {
            return Command.prototype.warn('User not found.', message);
        }
    }

}

module.exports = Kick;