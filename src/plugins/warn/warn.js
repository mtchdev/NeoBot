const meta = require('./warn.json');
const wMessage = require('../../messages/warning');
const sMessage = require('../../messages/success');

exports.run = (message, client, args) => {
    // !warn [user] [reason]

    if(args[0] === null) return;
    if(args[1] === null) return;

    let reason = args.slice(1).join(' ');
    let user = message.mentions.users.first();

    if(typeof user === 'undefined') {
        message.delete();
        wMessage('Please @mention a user to warn.', message);
        return;
    }

    user.send(`You were warned on ${message.guild.name}: ${reason}`);

    sMessage(`Warned ${user} for ${reason}`, message);

}