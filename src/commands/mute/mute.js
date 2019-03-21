const Command = require('../../structures/Command');

class Mute extends Command {
    
    constructor(){
        super({
            name: 'Mute',
            info: 'Mute a user',
            usage: 'mute [user] [reason]'
        });

        this.setup = this.setup.bind(this);
        this.mute = this.mute.bind(this);
    }

    async execute(message, client, args) {

        if(['-init', '-i', '-setup'].indexOf(args[0])+1)
            return this.setup(message);

        let res = await Command.prototype.apiget('config/roles/muted/get', {headers:{guild_id:message.guild.id}});
        if(['', null].indexOf(res.data.role)+1)
            return Command.prototype.warn('The mute feature isn\'t set up yet! Run `!mute -init` to begin.', message);
        if(!message.guild.roles.has(res.data.role))
            return Command.prototype.warn('The mute feature isn\'t set up yet! Run `!mute -init` to begin.', message);

        if(!args[0])
            return Command.prototype.warn('Please @mention a user to mute.', message);
        if(!args[1])
            return Command.prototype.warn('Please specify a reason.', message);
        
        let user = message.mentions.members.first();
        let reason = args.slice(1).join(' ');

        if(user.id == message.author.id)
            return Command.prototype.warn('You cannot mute yourself!', message);
        if(user.roles.has(res.data.role))
            return Command.prototype.warn('User is already muted!', message);

        await this.mute(message.guild.id, message.author.id, user, reason, res.data.role, message);

    }

    async setup(message) {
        Command.prototype.log('Running mute setup', 4);
        try {
            let role = await message.guild.createRole({name: 'Muted'});
            await role.setPermissions(0);
            await Command.prototype.apipost('config/roles/muted/set', {guild_id:message.guild.id,role_id:role.id});
            Command.prototype.success('Successfully initialized mute feature. You will need to adjust the permissions (disable sending messages) for **@'+role.name+'** in each channel.', message);
            Command.prototype.log('Mute setup completed without any faults', 4);
        } catch (err) {
            Command.prototype.log('An error occurred while attempting mute setup: '+err, 2);
            Command.prototype.warn('An error occurred.', message);
            return;
        }
    }

    async mute(guild, actor, user, reason, role, message) {
        let data = {
            guild_id: guild,
            actor: actor,
            user: user.id,
            reason: reason
        };

        let res = await Command.prototype.apipost('mute/new', data);
        await user.addRole(role);
        Command.prototype.success('`[CASE #'+res.data.case+']` Muted '+user+' for '+reason, message);
        user.send(`You were muted on ${message.guild.name}: ${reason}`);
    }

}

module.exports = Mute;