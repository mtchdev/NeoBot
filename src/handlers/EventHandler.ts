import guildCreate from '../events/guildCreate';
import Message from '../events/message';
import guildMemberAdd from '../events/guildMemberAdd';

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