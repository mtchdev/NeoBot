const axios = require('axios');

module.exports = (member, client, message, guild) => {

    let userid = member.user.id;
    axios.get('http://localhost:8000/mute/get', {headers:{user_id:userid}}).then(res => {
        if(res.data.message !== 200) return;
        if(res.data.data == null) return;
        axios.get('http://localhost:8000/config/roles/muted/get', {headers:{guild_id:member.guild.id}}).then(resp => {
            if(resp.data.role !== null) {
                member.addRole(resp.data.role)
            }
        });
    });

}