const meta = require('./warn.json');
const wMessage = require('../../messages/warning');
const sMessage = require('../../messages/success');
const axios = require('axios');

exports.run = (message, client, args) => {
    // !warn [user] [reason]

    if(args[0] === null) return;
    if(args[1] === null) return;

    let reason = args.slice(1).join(' ');
    let user = message.mentions.users.first();

    if(typeof user === 'undefined') {
        message.delete();
        wMessage('Please @mention a user on this server to warn.', message);
        return;
    }
    
    let plainid = args[0].replace(/[<@>]/g,'');

    if(plainid === message.author.id) {
        message.delete();
        wMessage(`You can't warn yourself!`, message);
        return;
    }

    let data = {
        guild_id: message.guild.id,
        user: user.id,
        reason: reason,
        actor: message.author.id
    }

    axios.post('http://localhost:8000/warn/new', data).then(res => {
        if(res.data.message !== 200) return;
        sMessage('`[CASE #'+res.data.case+']`Warned '+user+' for '+reason, message);
        user.send(`You were warned on ${message.guild.name}: ${reason}`);
    }).catch(err => {
        wMessage(err, message);
    });

}

usage = (meta, message) => {
    return message.channel.send('Usage: `'+meta.meta.usage+'`');
}