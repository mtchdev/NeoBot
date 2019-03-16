const meta = require('./ban.json');
const wMessage = require('../../messages/warning');
const sMessage = require('../../messages/success');
const axios = require('axios');

exports.run = (message, client, args) => {

    if(!args[0]) return;
    if(!args[1]) return;

    let reason = args.slice(1).join(' ');
    let user = message.mentions.users.first();

    if(!user)
        return wMessage('Please @mention a valid user.', message);

    if(!user.bannable)
        return wMessage('That user cannot be banned.', message);

    user.send('You were banned on '+message.guild.name+' for '+reason).then(() => {
        user.ban(reason).catch(err => {
            wMessage(err, message);
        });
        sMessage(user+' was banned for '+reason);
    });

}