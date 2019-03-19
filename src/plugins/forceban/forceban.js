const meta = require('./forceban.json');
const wMessage = require('../../messages/warning');
const sMessage = require('../../messages/success');
const axios = require('axios');

exports.run = (message, client, args) => {

    if(!args[0])
        return wMessage('Please specify a user ID to ban.', message);
    if(!args[1])
        return wMessage('Please provide a reason.', message);

    let reason = args.slice(1).join(' ');

    client.fetchUser(args[0]).then(guildUser => {
        message.guild.ban(guildUser.id).then(() => {
            let data = {
                guild_id: message.guild.id,
                user: guildUser.id,
                reason: reason,
                actor: message.author.id
            }
            axios.post('http://localhost:8000/ban/new', data).then(res => {
                if(res.data.message !== 200) return;
                sMessage('`[CASE #'+res.data.case+']` Forcebanned **'+guildUser.username+'#'+guildUser.discriminator+'** for '+reason, message);
            }).catch(err => {
                wMessage(err, message);
            });
        })
    }).catch(err => {
        wMessage('User does not exist.'+err, message);
    });

}