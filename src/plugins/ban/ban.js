const meta = require('./ban.json');
const wMessage = require('../../messages/warning');
const sMessage = require('../../messages/success');
const axios = require('axios');

exports.run = (message, client, args) => {

    if(!args[0]) return;
    if(!args[1]) return;

    let reason = args.slice(1).join(' ');
    let user = message.mentions.members.first();

    if(!user)
        return wMessage('Please @mention a valid user.', message);

    if(!user.bannable)
        return wMessage('That user cannot be banned.', message);

    if(user.id === message.author.id)
        return wMessage('You cannot ban yourself.', message);

    user.send('You were banned on '+message.guild.name+' for '+reason).then(() => {
        user.ban(reason)
        .then(() => {
            let data = {
                guild_id: message.guild.id,
                user: user.id,
                reason: reason,
                actor: message.author.id
            }
            axios.post('http://localhost:8000/ban/new', data).then(res => {
                if(res.data.message !== 200) return;
                sMessage('`[CASE #'+res.data.case+']` Banned '+user+' for '+reason, message);
            }).catch(err => {
                wMessage(err, message);
            });
        })
        .catch(err => {
            wMessage(err, message);
        });
    }).catch(() => {
        user.ban(reason)
        .then(() => {
            let data = {
                guild_id: message.guild.id,
                user: user.id,
                reason: reason,
                actor: message.author.id
            }
            axios.post('http://localhost:8000/ban/new', data).then(res => {
                if(res.data.message !== 200) return;
                sMessage('`[CASE #'+res.data.case+']` Banned '+user+' for '+reason, message);
            }).catch(err => {
                wMessage(err, message);
            });
        })
        .catch(err => {
            wMessage(err, message);
        });
    });

}