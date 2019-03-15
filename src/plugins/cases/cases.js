const meta = require('./cases.json');
const wMessage = require('../../messages/warning');
const sMessage = require('../../messages/success');
const axios = require('axios');

exports.run = (message, client, args) => {
    // !cases [user]

    if(args[0] === null) return;

    let user = args[0].replace(/[<@>]/g,'');;

    if(typeof user === 'undefined') {
        message.delete();
        wMessage('Please @mention a user on this server or paste their ID to find their cases.', message);
        return;
    }

    axios.get('http://localhost:8000/cases/get', {headers:{user:user}}).then(res => {
        
        let arr = res.data.data;

        if (arr.length === 0 || null){
            message.channel.send('<@'+user+'> has 0 cases.');
            return;
        }

        let cases;
        arr.length >= 2 ? cases='cases' : cases='case';
        message.channel.send('Found '+arr.length+' '+cases+' for <@'+user+'>:');
        for (let i = 0; i < arr.length; i++) {
            const element = arr[i];
            let type = element.type.charAt(0).toUpperCase() + element.type.slice(1);
            message.channel.send('`[CASE #'+element.case+']` __'+type+'__: '+element.reason);
        }

    }).catch(err => {
        console.log(err);
    });

    // TODO: get cases
}