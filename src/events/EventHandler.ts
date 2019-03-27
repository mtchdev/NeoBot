import guildCreate from './guildCreate';
import Message from './message';
import guildMemberAdd from './guildMemberAdd';

class EventHandler {
    public client: any;

    constructor(client: any) {
        this.client = client;
        this.handle();
    }

    handle() {
        this.client.on('guildCreate', (client: any) => {
            new guildCreate(client);
        })
        this.client.on('message', (client: any) => {
            new Message(client);
        })
        this.client.on('guildMemberAdd', (client: any) => {
            new guildMemberAdd(client);
        })
        return false;
    }
}

export default EventHandler;