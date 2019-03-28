import Command from '../../structures/Command';

class Case extends Command {

    message: any;
    client: any;
    args?: any;

    constructor(message: any, client: any, args: any[]) {
        super({
            name: 'Case',
            info: 'Find a specific case with for a specific user with their user ID',
            usage: 'case [id] | case [id] -del | case [id] edit [reason]',
            category: 'Moderation'
        }, message);

        this.message = message;
        this.client = client;
        this.args = args;

        this.execute();
    }


    async execute() {

        if(['help', 'h'].indexOf(this.args[0])+1)
            return super.cmdhelp();
        
        if(!this.args[0])
            return super.warn('Please specify a case ID.');

        let x = Number(this.args[0]);
        let param = this.args[1];
        
        if(isNaN(x)) return;

        if(['edit'].indexOf(this.args[1])+1)
            return this.editCase(x);

        if(['-del', '-d', '-delete'].indexOf(param)+1)
            return this.deleteCase(x);

        await this.getCase(x);

    }

    async editCase(case_id: number) {
        try {
            let reason = this.args.slice(2).join(' ');
            let data = {
                case_id: case_id,
                reason: reason
            }
            await super.apipost('cases/edit', data);
            super.success('Case `#'+case_id+'` edited.');
        } catch (err) {
            super.log(err, 3);
            super.warn('An error occurred.');
        }
    }

    async getCase(case_id: number) {
        try {
            let res = await super.apiget('cases/specific', {headers:{case:case_id}});
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

            let a = await this.client.fetchUser(data.user);
            avatarURL = a.avatarURL;
            this.message.channel.send({
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
            super.warn('Case not found.');
        }
    }

    async deleteCase(case_id: number) {
        try {
            await super.apipost('cases/delete', {case:case_id});
            super.success('Successfully deleted case `#'+case_id+'`!');
        } catch (err) {
            super.warn(err);
        }

    }

}

export default Case;