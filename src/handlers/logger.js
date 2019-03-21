const chalk = require('chalk');

class Logger {

    constructor(){
        this.format = this.format.bind(this);
    }

    async log(message, level) {

        let lvl = await this.format(level);
        let levelString = lvl.name.toUpperCase();
        console.log(lvl.color(levelString)+': '+message);

    }

    async format(level) {
        var lvl = {};
        switch(level) {
            case 1:
            lvl = { name: 'fatal', color: chalk.red.bgBlack }
                break;
            case 2:
            lvl = { name: 'error', color: chalk.black.bgRed }
                break;
            case 3:
            lvl = { name: 'warn', color: chalk.black.bgYellow }
                break;
            case 4:
            lvl = { name: 'info', color: chalk.black.bgGreen }
                break;
            case 5:
            lvl = { name: 'api', color: chalk.black.bgCyan }
                break;
        }

        return lvl;
    }

    async write(message) {

    }

}

module.exports = Logger;