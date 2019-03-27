const Command = require('../../structures/Command');

class AddRole extends Command {
    
    constructor(){
        super({
            name: 'Add role',
            info: 'Add a role to a user. The role name is CaSe seNSitIvE',
            usage: 'addRole [user] [role]'
        });
    }

    async execute(message, client, args) {
        if(['help', 'h'].indexOf(args[0])+1)
        return super.cmdhelp(message);
        
        let user = message.mentions.members.first();

        var role = await message.guild.roles.find(roles => roles.name == args[1]);
        if(role == null)
            return super.warn('Role not found.', message);

        if(typeof user == 'undefined')
            return super.warn('Please @mention a user on this server to add the role to.', message);

        if(user.roles.has(role.id))
            return super.warn('User already has the **'+role.name+'** role.', message);

        await this.addrole(message, role, user);
    }

    async addrole(message, role, user) {
        try {
            await user.addRole(role)
            super.success('Successfully added '+role+' to '+user+'', message);
        } catch (err) {
            super.log('Failed to add '+role+' to '+user+'', message);
            super.warn('An error occured.', message);
        }
    }
} 

module.exports = AddRole;