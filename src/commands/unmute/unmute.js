const Command = require('../../structures/Command');

class Unmute extends Command {
    
    constructor(){
        super({
            name: 'Unmute',
            info: 'Unmute a user',
            usage: 'unmute [name]'
        });

        this.unmute = this.unmute.bind(this);
    }

    async execute(client, message, args) {
        if(!args[0])
        return wMessage('Please provide a user to unmute.', message);
    
        let user = message.mentions.members.first();

        axios.get('http://localhost:8000/config/roles/muted/get', {headers:{guild_id:message.guild.id}}).then(res => {
            if(!user.roles.has(res.data.role))
                return Command.prototype.warn('User is not muted!', message);
            if(user.id == message.author.id)
                return Command.prototype.warn('You cannot unmute yourself.', message);
            await this.unmute(message.guild.id, user.id, message.author.id, res);

        });
    }

    async unmute(guild, user, actor, res) {
        let data = {
            guild_id: guild,
            user: user,
            actor: actor
        }
        await Command.prototype.apipost('http://localhost:8000/mute/unmute', data).then(resp => {
            user.removeRole(res.data.role);
            Command.prototype.success('`[CASE #'+resp.data.case+']` Unmuted **'+user.user.username+'#'+user.user.discriminator+'**.', message);
            user.send(`You were unmuted on ${message.guild.name}.`);
            return false;
        }).catch(err => {
            Command.prototype.warn(err, message);
            return false;
        });

        return false;
    }

}

module.exports = Unmute;