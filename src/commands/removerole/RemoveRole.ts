import Command from '../../structures/Command';

class RemoveRole extends Command {

    message: any;
    client: any;
    args?: any;

    constructor(message: any, client: any, args: any[]) {
        super({
            name: 'Remove Role',
            info: 'Remove a role from a user',
            usage: 'removerole [uid] [roleid]',
            category: 'Moderation'
        }, message);

        this.message = message;
        this.client = client;
        this.args = args;

        this.execute();
    }

    async execute() {

        if(!this.args[0])
            return super.warn('Please @mention a user to remove a role from.');
        if(!this.args[1])
            return super.warn('Please enter a role ID.');

        if(['help', 'h'].indexOf(this.args[0])+1)
            return super.cmdhelp();

        let user = this.message.mentions.members.first();
        let role = await this.message.guild.roles.find((roles: any) => roles.name == this.args[1]);

        if(role == null)
            return super.warn('Role not found.');
        if(!user.roles.has(role.id))
            return super.warn('User does not have the '+role+' role.');
        if(typeof user == 'undefined')
            return super.warn('Please @mention a user on this server to remove the role from.');

        await this.removeRole(role, user);
    }

    async removeRole(role: string, user: any) {
        try {
            await user.removeRole(role)
            super.success('Successfully removed '+role+' from '+user+'');
        } catch (err) {
            super.log('Failed to remove '+role+' from '+user, 2);
            super.warn('An error occured.');
        }
    }

}

export default RemoveRole;