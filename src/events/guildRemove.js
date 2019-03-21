const axios = require('axios');
const API = require('../handlers/api.js');

module.exports = guild => {

    let data = {
        guild_id: guild.id
    }

    axios.post(API.api_url+'guild/remove', data).catch(err => {
        console.log(err)
    })

}