const meta = require('./mute.json');
const wMessage = require('../../messages/warning');
const sMessage = require('../../messages/success');
const axios = require('axios');

exports.run = (message, client, args) => {

    if(['-init', '-i'].indexOf(args[0])+1){
        // RUN SETUP OF MUTE FEATURE
        message.guild.createRole({
            name: 'Muted'
        }).then(role => {
            role.setPermissions(0).then(() => {
                axios.post('http://localhost:8000/config/roles/muted/set', {guild_id:message.guild.id,role_id:role.id}).then(res => {
                    if(res.data.message == 200){
                        sMessage('Successfully initialized mute feature. You will need to adjust the permissions (disable sending messages) for **@'+role.name+'** in each channel.', message);
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
        if(!message.guild.roles.has(res.data.role))
            return wMessage('The mute feature isn\'t set up yet! Run `!mute -init` to begin.', message);

        if(!args[0])
            return wMessage('Please @mention a user or paste their ID to mute.', message);
        if(!args[1])
            return wMessage('Please provide a reason.', message);

        let user = message.mentions.members.first();
        let reason = args.slice(1).join(' ');

        if(user.id == message.author.id)
            return wMessage('You cannot mute yourself!', message);

        let data = {
            guild_id: message.guild.id,
            actor: message.author.id,
            user: user.id,
            reason: reason
        };

        axios.post('http://localhost:8000/mute/new', data).then(resp => {
            if(resp.data.message !== 200) return;
            user.addRole(res.data.role);
            sMessage('`[CASE #'+resp.data.case+']` Muted '+user+' for '+reason, message);
            user.send(`You were muted on ${message.guild.name}: ${reason}`);
        }).catch(err => {
            wMessage(err, message);
        });
    });

}