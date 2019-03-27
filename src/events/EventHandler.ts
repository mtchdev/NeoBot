import guildCreate from './guildCreate';
import Message from './message';

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
        return false;
    }
}

export default EventHandler;