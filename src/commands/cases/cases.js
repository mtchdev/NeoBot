const Command = require('../../structures/Command');

class Cases extends Command {

    constructor() {
        super({
            name: 'Cases',
            info: 'Retreive all the moderation cases for a specified user',
            usage: 'cases [user|uid]'
        });
    }

    async execute(message, client, args) {
        if(!args[0])
            return Command.prototype.warn('Please @mention a user or specify their UID to find cases.', message);

        let user = args[0].replace(/[<@>]/g,'');

        if(typeof user == 'undefined')
            return Command.prototype.warn('Please @mention a user or specify their UID to find cases.', message);

        let res = await Command.prototype.apiget('cases/get', {headers:{user:user}});
        let arr = res.data.data;

        try {
            let guildUser = await client.fetchUser(user);
            if ([0, null].indexOf(arr.length) +1){
                message.channel.send('**'+guildUser.username+'#'+guildUser.discriminator+'** has 0 cases.');
                return;
            }

            let cases;
            arr.length >= 2 ? cases='cases' : cases='case';
            message.channel.send('Found '+arr.length+' '+cases+' for **'+guildUser.username+'#'+guildUser.discriminator+'**:');
            for (let i = 0; i < arr.length; i++) {
                const element = arr[i];
                let type = element.type.charAt(0).toUpperCase() + element.type.slice(1);
                message.channel.send(''+element.created_at+' | `[CASE #'+element.id+']` __'+type+'__: '+element.reason+' (**by `<@'+element.actor+'>`**)');
            }
        } catch (err) {
            Command.prototype.warn('User not found.', message);
        }

    }

}

module.exports = Cases;