const axios = require('axios');
const API = require('../handlers/api.js');

module.exports = guild => {

    let data = {
        guild_id: guild.id,
        owner_id: guild.ownerID
    }

    axios.post(API.api_url+'guild/add', data).catch(err => {
        console.log(err)
    });

}