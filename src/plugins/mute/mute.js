const meta = require('./mute.json');
const wMessage = require('../../messages/warning');
const sMessage = require('../../messages/success');
const axios = require('axios');

exports.run = (message, client, args) => {

    console.log(message.guild.roles);

    if(['-init', '-i'].indexOf(args[0])+1){
        // RUN SETUP OF MUTE FEATURE
        message.guild.createRole({
            name: 'Muted'
        }).then(role => {
            role.setPermissions(0).then(() => {
                axios.post('http://localhost:8000/config/roles/muted/set', {guild_id:message.guild.id,role_id:role.id}).then(res => {
                    if(res.data.message == 200){
                        sMessage('Successfully initialized mute feature.', message);
                    };
                }).catch(err => {
                    wMessage(err, message);
                });
            }).catch(err => {
                wMessage(err, message);
            });
        }).catch(err => {
            wMessage(err, message);
        });
        return;
    }

    // Check if muted role is set

    axios.get('http://localhost:8000/config/roles/muted/get', {headers:{guild_id:message.guild.id}}).then(res => {
        if(['', null].indexOf(res.data.role) +1)
            return wMessage('The mute feature isn\'t set up yet! Run `!mute -init` to begin.', message);
    })

}