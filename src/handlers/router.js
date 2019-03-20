const Warn = require('../commands/warn/Warn');
const Unmute = require('../commands/unmute/Unmute');
const Unban = require('../commands/unban/Unban');
const Mute = require('../commands/mute/Mute');
const Forceban = require('../commands/forceban/forceban');

class Router {
    constructor() {
        this.route = this.route.bind(this);
    }

    route(cmd, client, message, args) {
        console.log(cmd)
        switch (cmd) {
            case "warn":
                let warn = new Warn;
                warn.execute(message, client, args);
                break;
            case "unmute":
                let unmute = new Unmute;
                unmute.execute(message, client, args);
                break;
            case "unban":
                let unban = new Unban;
                unban.execute(message, client, args);
                break;
            case "mute":
                let mute = new Mute;
                mute.execute(message, client, args);
                break;
            case "forceban":
                let forceban = new Forceban;
                forceban.execute(message, client, args);
            default:
                break;
        }
    }
}

module.exports = Router;