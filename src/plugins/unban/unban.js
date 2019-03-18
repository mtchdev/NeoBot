const meta = require('./unban.json');
const wMessage = require('../../messages/warning');
const sMessage = require('../../messages/success');
const axios = require('axios');

exports.run = (message, client, args) => {

    if(!args[0])
        return wMessage('Please enter a user ID to unban.', message);

    if(typeof user.id == 'undefined')
        return wMessage('Please enter a valid user ID.', message);
    
    message.guild.unban(user).then(guildUser => {
        let data = {
            guild_id: message.guild.id,
            user: user.id,
            actor: message.author.id
        }
        axios.post('http://localhost:8000/ban/unban', data).then(res => {
            if(res.data.message !== 200) return;
            sMessage('`[CASE #'+res.data.case+']` Unbanned '+guildUser.username+'#'+guildUser.discriminator+'.', message);
        }).catch(err => {
            wMessage(err, message);
        });
    })

}