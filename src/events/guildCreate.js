const axios = require('axios');

module.exports = guild => {

    let data = {
        guild_id: guild.id,
        owner_id: guild.ownerID
    }

    axios.post('http://localhost:8000/guild/add', data).catch(err => {
        console.log(err)
    });

}