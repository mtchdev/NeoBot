const Command = require('../../structures/Command');

class Cases extends Command {

    constructor() {
        super({
            name: 'Cases',
            info: 'Retreive all the moderation cases for a specified user',
            usage: 'cases [user|uid]',
            category: 'Moderation'
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
            arr.map(a => {
                console.log(a)
                let type = a.type.charAt(0).toUpperCase() + a.type.slice(1);
                message.channel.send(''+a.created_at+' | `[CASE #'+a.id+']` __'+type+'__: '+a.reason);
            })
        } catch (err) {
            Command.prototype.log('Unable to find user (cases)', 3);
            Command.prototype.warn('User not found.', message);
        }

    }

}

module.exports = Cases;