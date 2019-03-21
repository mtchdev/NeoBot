const Warn = require('../commands/warn/Warn');
const Unmute = require('../commands/unmute/Unmute');
const Unban = require('../commands/unban/Unban');
const Mute = require('../commands/mute/Mute');
const Forceban = require('../commands/forceban/forceban');
const Cases = require('../commands/cases/Cases');
const Case = require('../commands/case/Case');
const Ban = require('../commands/ban/Ban');

class Router {
    constructor() {
        this.route = this.route.bind(this);
    }

    route(cmd, client, message, args) {
        switch (cmd) {
            case "warn":
                new Warn().execute(message, client, args);
                break;
            case "unmute":
                new Unmute().execute(message, client, args);
                break;
            case "unban":
                new Unban().execute(message, client, args);
                break;
            case "mute":
                new Mute().execute(message, client, args);
                break;
            case "forceban":
                new Forceban().execute(message, client, args);
            case "cases":
                new Cases().execute(message, client, args);
                break;
            case "case":
                new Case().execute(message, client, args);
                break;
            case "ban":
                new Ban().execute(message, client, args);
                break;
            default:
                break;
        }
    }
}

module.exports = Router;