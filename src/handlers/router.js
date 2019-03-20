const Warn = require('../commands/warn/Warn');
const Unmute = require('../commands/unmute/Unmute');

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
        
            default:
                break;
        }
    }
}

module.exports = Router;