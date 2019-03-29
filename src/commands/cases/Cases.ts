import Command from '../../structures/Command';

class Cases extends Command {

    message: any;
    client: any;
    args?: any;

    constructor(message: any, client: any, args: any[]) {
        super({
            name: 'Cases',
            info: 'Gets all the cases for a specified user',
            usage: 'cases [id|@mention]',
            category: 'Moderation'
        }, message);

        this.message = message;
        this.client = client;
        this.args = args;

        this.execute();
    }

    async execute() {
        if(!this.args[0])
            return super.warn('Please @mention a user or specify their UID to find cases.');

        if(['help', 'h'].indexOf(this.args[0])+1)
            return super.cmdhelp();

        let user = this.args[0].replace(/[<@>]/g,'');

        if(typeof user == 'undefined')
            return super.warn('Please @mention a user or specify their UID to find cases.');

        await this.getCases(user);
    }

    async getCases(user: any) {
        let res = await super.apiget('cases/get', {headers:{user:user}});
        let arr = res.data.data;

        try {
            let guildUser = await this.client.fetchUser(user);
            if ([0, null].indexOf(arr.length) +1){
                this.message.channel.send('**'+guildUser.username+'#'+guildUser.discriminator+'** has 0 cases.');
                return;
            }

            let cases;
            arr.length >= 2 ? cases='cases' : cases='case';
            var conc: string = '';
            conc = 'Found '+arr.length+' '+cases+' for **'+guildUser.username+'#'+guildUser.discriminator+'**:\n';
            for (let i = 0; i < arr.length; i++) {
                let e = arr[i];
                let type = e.type.charAt(0).toUpperCase() + e.type.slice(1);
                conc += e.created_at+' | `[CASE #'+e.id+']` __'+type+'__: '+e.reason+'\n';
                if(i == arr.length-1) {
                    this.message.channel.send(conc);
                }
            }
        } catch (err) {
            super.log('Unable to find user (cases)', 3);
            super.warn('User not found.');
        }
    }

}

export default Cases;