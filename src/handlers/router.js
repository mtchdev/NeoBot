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
            case "cases":
                let c = new Cases;
                c.execute(message, client, args);
                break;
            case "case":
                let cs = new Case;
                cs.execute(message, client, args);
                break;
            case "ban":
                let ban = new Ban;
                ban.execute(message, client, args);
                break;
            default:
                break;
        }
    }
}

module.exports = Router;