const meta = require('./cases.json');
const wMessage = require('../../messages/warning');
const sMessage = require('../../messages/success');
const axios = require('axios');

exports.run = (message, client, args) => {
    // !cases [user]

    if(args[0] === null) return;

    let user = args[0];

    if(typeof user === 'undefined') {
        message.delete();
        wMessage('Please @mention a user on this server or paste their ID to find their cases.', message);
        return;
    }

    // TODO: get cases
}