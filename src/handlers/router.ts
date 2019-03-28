import Warn from '../commands/warn/Warn';

import Logger from './logger';

class Router {
    public cmd: any;
    public client: any;
    public message: any;
    public args?: any;

    constructor(cmd: any, client: any, message: any, args: any) {
        this.cmd = cmd;
        this.client = client;
        this.message = message;
        this.args = args;
        this.route();
    }

    route() {
        switch(this.cmd) {
            case "warn": new Warn(this.message, this.client, this.args);
            default: this.noCommand();
        }
    }

    noCommand() {
        new Logger().log('Command '+this.cmd+' not found. Cancelling...', 3);
        this.message.channel.send('Command not found.');
    }
}

export default Router;