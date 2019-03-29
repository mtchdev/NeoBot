import Command from '../../structures/Command';

class Purge extends Command {
    // !purge [#]

    message: any;
    client: any;
    args?: any;

    constructor(message: any, client: any, args: any[]) {
        super({
            name: 'Purge',
            info: 'Purge a specific amount of messages. Maximum 99 messages',
            usage: 'purge [#]',
            category: 'Moderation'
        }, message);

        this.message = message;
        this.client = client;
        this.args = args;

        this.execute();
    }

    async execute(){
        if(!this.args[0])
            return super.warn('Please define a number of lines to delete');
        
        if(['help', 'h'].indexOf(this.args[0])+1)
            return super.cmdhelp();

        const deleteCount = parseInt(this.args[0], 10);

        if(typeof deleteCount !== 'number')
            return super.warn("Please enter a number.")

        if(!deleteCount || deleteCount < 1 || deleteCount > 99)
            return super.warn("Please provide a number between 1 and 99 for the number of messages to delete.");

        // check if vulgar words (cvnt for now)
        if(this.message.content == 'cunt') return;

        const fetched = await this.message.channel.fetchMessages({limit: deleteCount});

        try {
            await this.message.channel.bulkDelete(fetched)
            super.success('Successfully purged **'+deleteCount+' messages**.');
        } catch (err) {
            Command.prototype.log('Failed to bulk delete: '+err, 2);
            super.warn('An error occurred.');
        }
    }
}

export default Purge;