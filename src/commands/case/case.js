const Command = require('../../structures/Command');

class Case extends Command {

    constructor(){
        super({
            name: 'Case',
            info: 'Find a specific case with the ID',
            usage: 'case [id]'
        });
        
        this.deleteCase = this.deleteCase.bind(this);
        this.getCase = this.getCase.bind(this);
    }

    async execute(message, client, args) {
        if(!args[0])
            return Command.prototype.warn('Please specify a case ID.', message);

        let x = Number(args[0]);
        let param = args[1];
        if(isNaN(x)) return;

        if(['-del', '-d', '-delete'].indexOf(param)+1)
            return this.deleteCase(x, message);

        await this.getCase(x, message, client);

    }

    async getCase(case_id, message, client) {
        try {
            let res = await Command.prototype.apiget('cases/specific', {headers:{case:case_id}});
            let data = res.data.data;
            let type = data.type.charAt(0).toUpperCase() + data.type.slice(1);
            var color;
            var avatarURL;

            switch(data.type) {
                case "warn":
                    color = 15322429;
                break;
                case "ban":
                    color = 15945263;
                break;
                case "unban":
                    color = 6670643;
                break;
                case "mute":
                    color = 3375305;
                break;
                case "unmute":
                    color = 3594411;
                break;
            }

            let a = await client.fetchUser(data.user);
            avatarURL = a.avatarURL;
            message.channel.send({
                "embed": {
                    "color": color,
                    "timestamp": `${res.data.time}`,
                    "author": {
                    "name": `CASE #${data.id}`
                    },
                    "thumbnail": {
                    "url": avatarURL
                    },
                    "fields": [
                    {
                        "name": "Type",
                        "value": type,
                        "inline": true
                    },
                    {
                        "name": "User",
                        "value": `<@${data.user}>`,
                        "inline": true
                    },
                    {
                        "name": "Actor",
                        "value": `<@${data.actor}>`,
                        "inline": true
                    },
                    {
                        "name": "Reason",
                        "value": data.reason
                    }
                    ]
                }
            });
        } catch (err) {
            Command.prototype.warn('Case not found.', message);
        }
    }

    async deleteCase(case_id, message) {
        try {
            await Command.prototype.apipost('cases/delete', {case:case_id});
            Command.prototype.success('Successfully deleted case `#'+case_id+'`!', message);
        } catch (err) {
            Command.prototype.warn(err, message);
        }

    }

}

module.exports = Case;