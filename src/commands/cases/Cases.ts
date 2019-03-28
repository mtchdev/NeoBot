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
            this.message.channel.send('Found '+arr.length+' '+cases+' for **'+guildUser.username+'#'+guildUser.discriminator+'**:');
            let waitMessage = await this.message.channel.send('Loading cases (this may take a while)...');
            var conc: string = '';
            arr.map((a: any) => {
                let type = a.type.charAt(0).toUpperCase() + a.type.slice(1);
                conc += a.created_at+' | `[CASE #'+a.id+']` __'+type+'__: '+a.reason+'\n';
            });
            setTimeout(() => {
                waitMessage.delete();
                this.message.channel.send(conc);
            }, 5000);
        } catch (err) {
            super.log('Unable to find user (cases)', 3);
            super.warn('User not found.');
        }
    }

}

export default Cases;