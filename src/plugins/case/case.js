const meta = require('./case.json');
const wMessage = require('../../messages/warning');
const sMessage = require('../../messages/success');
const axios = require('axios');

exports.run = (message, client, args) => {
    // !case [number]

    if(args[0] === null) {
        wMessage('Please enter a case ID.', message);
        return;
    }

    let x = Number(args[0]);
    
    if(isNaN(x)) return;

    axios.get('http://localhost:8000/cases/specific', {headers:{case:x}}).then(res => {
        let data = res.data.data[0];
        let type = data.type.charAt(0).toUpperCase() + data.type.slice(1);
        var color;
        
        switch(data.type) {
            case "warn":
                color = 15322429;
            break;
        }

        message.channel.send({
            "embed": {
              "color": color,
              "timestamp": `${data.created_at}`,
              "author": {
                "name": `CASE #${data.case}`
              },
              "fields": [
                {
                  "name": "Type",
                  "value": type,
                  "inline": true
                },
                {
                  "name": "Actor",
                  "value": `<@${data.actor}>`,
                  "inline": true
                },
                {
                  "name": "User",
                  "value": `<@${data.user}>`,
                  "inline": true
                },
                {
                  "name": "Reason",
                  "value": data.reason
                }
              ]
            }
        })
    })

}