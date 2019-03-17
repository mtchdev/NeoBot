const meta = require('./unmute.json');
const wMessage = require('../../messages/warning');
const sMessage = require('../../messages/success');
const axios = require('axios');

exports.run = (message, client, args) => {

    if(!args[0])
        return wMessage('Please provide a user to unmute.', message);
    
    let user = message.mentions.members.first();
    axios.get('http://localhost:8000/config/roles/muted/get', {headers:{guild_id:message.guild.id}}).then(res => {
        if(!user.roles.has(res.data.role))
            return wMessage('User is not muted!', message);

        let data = {
            guild_id: message.guild.id,
            user: user.id,
            actor: message.author.id
        }
        axios.post('http://localhost:8000/mute/unmute', data).then(resp => {
            user.removeRole(res.data.role);
            sMessage('`[CASE #'+resp.data.case+']` Unmuted **'+user.user.username+'#'+user.user.discriminator+'**.', message);
            user.send(`You were unmuted on ${message.guild.name}.`);
        }).catch(err => {
            wMessage(err, message);
        })
    });

}