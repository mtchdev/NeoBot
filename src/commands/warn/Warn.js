import message from '../../events/message';
const Command = require('../../structures/Command');

class Warn extends Command {
    // !warn [user] [reason]

    constructor(){
        super({
            name: 'Warn',
            info: 'Warn a user on the server.',
            usage: 'warn [user] [name]'
        });
        this.warn = this.warn.bind(this);
    }

    async execute(message, client, args){
        if(!args[0])
        return Command.prototype.warn('Please provide a user to warn.', message);

        if(['help', 'h'].indexOf(args[0])+1)
            return Command.prototype.help(message);
        
        if(!args[1])
            return Command.prototype.warn('Please provide a reason.', message);

        let reason = args.slice(1).join(' ');
        let user = message.mentions.users.first();

        if(typeof user == 'undefined')
            return Command.prototype.warn('Please @mention a user on this server to warn.', message);
            
        let plainid = args[0].replace(/[<@>]/g,'');

        if(plainid == message.author.id)
            return Command.prototype.warn('You cannot warn yourself!', message);

        await this.warn(message.guild.id, user.id, reason, message.author.id);       
    }

    async warn(guild, user, reason, actor){
        let data = {
            guild_id: guild,
            user: user,
            reason: reason,
            actor: actor
        }

        try {
            let res = await Command.prototype.apiget('warn/new', data);
            if(res.data.message !== 200) return;
            Command.prototype.success('`[CASE #'+res.data.case+']`Warned '+user+' for '+reason, message);
            user.send(`You were warned on ${message.guild.name}: ${reason}`);
        } catch (err) {
            Command.prototype.warn(err, message);
        }

        return false;
    }

}

module.exports = Warn;