const Command = require('../../structures/Command');

class Unmute extends Command {
    
    constructor(){
        super({
            name: 'Unmute',
            info: 'Unmute a user',
            usage: 'unmute [name]',
            category: 'Moderation'
        });

        this.unmute = this.unmute.bind(this);
    }

    async execute(message, client, args) {

        if(['help', 'h'].indexOf(args[0])+1)
            return super.cmdhelp(message);
        
        if(!args[0])
        return wMessage('Please provide a user to unmute.', message);
    
        let user = message.mentions.members.first();

        try {
            let res = await Command.prototype.apiget('config/roles/muted/get', {headers:{guild_id:message.guild.id}});
            if(!user.roles.has(res.data.role))
                return Command.prototype.warn('User is not muted!', message);
            if(user.id == message.author.id)
                return Command.prototype.warn('You cannot unmute yourself.', message);
            await this.unmute(message.guild.id, user, message.author.id, res, message);
        } catch (err) {
            Command.prototype.warn(err, message);
            return;
        }
    } 

    async unmute(guild, user, actor, res, message) {
        let data = {
            guild_id: guild,
            user: user.id,
            actor: actor
        }

        try {
            let resp = await Command.prototype.apipost('mute/unmute', data);
            user.removeRole(res.data.role);
            Command.prototype.success('`[CASE #'+resp.data.case+']` Unmuted **'+user.user.username+'#'+user.user.discriminator+'**.', message);
            try {
                user.send(`You were unmuted on ${message.guild.name}.`);
            } catch (err) {
                Command.prototype.log('Failed to send message to target user', 3);
            }
        } catch (err) {
            Command.prototype.log('An error occurred while unmuting: '+err, 2);
            Command.prototype.warn(err, message);
            return;
        }

        return false;
    }

}

module.exports = Unmute;