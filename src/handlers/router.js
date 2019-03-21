const Warn = require('../commands/warn/Warn');
const Unmute = require('../commands/unmute/Unmute');
const Unban = require('../commands/unban/Unban');
const Mute = require('../commands/mute/Mute');
const Forceban = require('../commands/forceban/forceban');
const Cases = require('../commands/cases/Cases');
const Case = require('../commands/case/Case');
const Ban = require('../commands/ban/Ban');
const Kick = require('../commands/kick/Kick');

const Logger = require('./logger');

class Router {
    constructor() {
        this.route = this.route.bind(this);
    }

    route(cmd, client, message, args) {
        switch (cmd) {
            case "warn":
                new Warn().execute(message, client, args);
                new Logger().log('Loaded worker for warn', 4);
                break;
            case "unmute":
                new Unmute().execute(message, client, args);
                new Logger().log('Loaded worker for unmute', 4);
                break;
            case "unban":
                new Unban().execute(message, client, args);
                new Logger().log('Loaded worker for unban', 4);
                break;
            case "mute":
                new Mute().execute(message, client, args);
                new Logger().log('Loaded worker for mute', 4);
                break;
            case "forceban":
                new Forceban().execute(message, client, args);
                new Logger().log('Loaded worker for forceban', 4);
                break;
            case "cases":
                new Cases().execute(message, client, args);
                new Logger().log('Loaded worker for cases', 4);
                break;
            case "case":
                new Case().execute(message, client, args);
                new Logger().log('Loaded worker for case', 4);
                break;
            case "ban":
                new Ban().execute(message, client, args);
                new Logger().log('Loaded worker for ban', 4);
                break;
            case "kick":
                new Kick().execute(message, client, args);
                new Logger().log('Loaded worker for kick', 4);
                break;
            default:
                new Logger().log('Command \''+cmd+'\' not found. Cancelling worker...', 3);
                break;
        }
    }
}

module.exports = Router;