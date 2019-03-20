const axios = require('axios');

module.exports = guild => {

    let data = {
        guild_id: guild.id
    }

    axios.post('http://localhost:8000/guild/remove', data).catch(err => {
        console.log(err)
    })

}