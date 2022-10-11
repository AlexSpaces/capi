export default class Logger {
    constructor({ env = 'dev', debug = false }) {
        this.env = env;
        this.debugMode = debug;
    }

    debug(message, data = null) {
        if (this.env !== 'production' && this.debugMode) {
            const date = new Date();
            console.log(`${date.getHours()}:${date.getMinutes()}:${date.getSeconds()} [DEBUG] ${message}`, data);
        }
    }

    info(message, data = null) {
        if (this.env !== 'production' && this.debugMode) {
            const date = new Date();
            console.log(`${date.getHours()}:${date.getMinutes()}:${date.getSeconds()} [INFO] ${message}`, data);
        }
    }

    error(message, data = null) {
        if (this.env !== 'production' && this.debugMode) {
            const date = new Date();
            console.error(`${date.getHours()}:${date.getMinutes()}:${date.getSeconds()} [ERROR] ${message}`, data);
        }
    }
}
