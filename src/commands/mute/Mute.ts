import Command from '../../structures/Command';

class Mute extends Command {
    //!mute [@user] [reason]

    message: any;
    client: any;
    args?: any;
    
    constructor(message: any, client: any, args: any[]){
        super({
            name: 'Mute',
            info: 'Mute a user. A role will be applied to the user which prevents them from using text and voice channels',
            usage: 'mute [@user] [reason]',
            category: 'Moderation'
        }, message);

        this.setup = this.setup.bind(this);
        this.mute = this.mute.bind(this);
        this.message = message;
        this.client = client;
        this.args = args;


        this.execute();
    }

    async execute() {

        
        if(['help', 'h'].indexOf(this.args[0])+1)
            return super.cmdhelp();

        if(['-init', '-i', '-setup'].indexOf(this.args[0])+1)
            return this.setup();

        let res = await Command.prototype.apiget('config/roles/muted/get', {headers:{guild_id:this.message.guild.id}});

        if(['', null].indexOf(res.data.role)+1)
            return super.warn('The mute feature isn\'t set up yet! Run `!mute -init` to begin.');

        if(!this.message.guild.roles.has(res.data.role))
            return super.warn('The mute feature isn\'t set up yet! Run `!mute -init` to begin.');

        if(!this.args[0])
            return super.warn('Please @mention a user to mute.');
        if(!this.args[1])
            return super.warn('Please specify a reason.');
            
        let user = this.message.mentions.members.first();
        let reason = this.args.slice(1).join(' ');

        if(user.id == this.message.author.id)
            return Command.prototype.warn('You cannot mute yourself!');
        if(user.roles.has(res.data.role))
            return Command.prototype.warn('User is already muted!');

        await this.mute(this.message.guild.id, this.message.author.id, user, reason, res.data.role);

    }

    async setup() {
        Command.prototype.log('Running mute setup', 4);
        try {
            let role = await this.message.guild.createRole({name: 'Muted'});
            await role.setPermissions(0);
            await super.apipost('config/roles/muted/set', {guild_id:this.message.guild.id,role_id:role.id});
            super.success('Successfully initialized mute feature. You will need to adjust the permissions (disable sending messages) for **@'+role.name+'** in each channel.');
            super.log('Mute setup completed without any faults', 4);
        } catch (err) {
           super.log('An error occurred while attempting mute setup: '+err, 2);
            super.warn('An error occurred.');
            return;
        }
    }

    async mute(guild: any, actor: string, user: any, reason: string, role: any) {
        let data = {
            guild_id: guild,
            actor: actor,
            user: user.id,
            reason: reason
        };

        let res = await super.apipost('mute/new', data);
        await user.addRole(role);
        super.success('`[CASE #'+res.data.case+']` Muted '+user+' for '+reason);
        try {
            await user.send(`You were muted on ${this.message.guild.name}: ${reason}`);
        } catch (err) {
            super.log('Failed to send message to target user', 3);
        }
    }

}

export default Mute;