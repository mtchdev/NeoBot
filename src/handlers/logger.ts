import chalk from 'chalk';

class Logger {

    constructor(){
    }

    async log(message: any, level: number) {

        let lvl = await this.format(level);
        let levelString = lvl.name.toUpperCase();
        console.log(lvl.color(levelString)+' '+message);

    }

    async format(level: number) {
        var lvl = {
            name: '',
            color: (temp: any) => {return ''}
        };
        switch(level) {
            case 1: lvl = { name: 'fatal', color: chalk.red.bgBlack }
            case 2: lvl = { name: 'error', color: chalk.black.bgRed }
            case 3: lvl = { name: 'warn', color: chalk.black.bgYellow }
            case 4: lvl = { name: 'info', color: chalk.black.bgCyan }
            case 5: lvl = { name: 'api', color: chalk.black.bgGreen }
        }

        return lvl;
    }

}

export default Logger;