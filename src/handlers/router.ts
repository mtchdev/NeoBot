import Warn from '../commands/warn/Warn';

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
        }
    }
}

export default Router;