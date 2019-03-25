const Command = require('../../structures/Command');

class RemoveRole extends Command {
    
    constructor(){
        super({
            name: 'Remove role',
            info: 'Remove a role to a user',
            usage: 'removeRole [user] [role]'
        });
    }

    async execute(message, client, args) {
        let user = message.mentions.members.first();

        var role = await message.guild.roles.find(roles => roles.name == args[1]);
        if(role == null)
            return super.warn('Role not found.', message);

        if(['help', 'h'].indexOf(args[0])+1)
            return super.cmdhelp(message);

        if(typeof user == 'undefined')
            return super.warn('Please @mention a user on this server to remove the role from.', message);

        await this.removerole(message, role, user);
    }

    async removerole(message, role, user) {
        try {
            await user.removeRole(role)
            super.success('Successfully removed '+role+' from '+user+'', message);
        } catch (err) {
            super.log('Failed to remove '+role+' from '+user+'', message);
            super.warn('An error occured.', message);
        }
    }
} 

module.exports = RemoveRole;