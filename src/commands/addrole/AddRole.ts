import Command from '../../structures/Command'

class AddRole extends Command {

    message: any;
    client: any;
    args?: any;
    
    constructor(message: any, client: any, args: any[]){
        super({
            name: 'Add role',
            info: 'Add a role to a user. The role name is CaSe seNSitIvE',
            usage: 'addRole [user] [role]'
        }, message);

        this.message = message;
        this.client = client;
        this.args = args;

        this.execute()
    }

    async execute() {

        if(!this.args[0])
            return super.warn('Please @mention a user on this server to add a role to.');
        if(!this.args[1])
            return super.warn('Please enter a role ID to add.');

        if(['help', 'h'].indexOf(this.args[0])+1)
            return super.cmdhelp();
        
        let user = this.message.mentions.members.first();

        var role = await this.message.guild.roles.find((roles: { name: any; }) => roles.name == this.args[1]);
        if(role == null)
            return super.warn('Role not found.');

        if(typeof user == 'undefined')
            return super.warn('Please @mention a user on this server to add the role to.');

        if(user.roles.has(role.id))
            return super.warn('User already has the **'+role.name+'** role.');

        await this.addrole(this.message, role, user);
    }

    async addrole(message: number, role: any, user: any) {
        try {
            await user.addRole(role)
            super.success('Successfully added '+role+' to '+user+'');
        } catch (err) {
            super.log('Failed to add '+role+' to '+user+'/', message);
            super.warn('An error occured.');
        }
    }
} 

export default AddRole;