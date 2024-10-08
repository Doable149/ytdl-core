"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logger = void 0;
const constants_1 = require("./constants");
const OUTPUT_CONTROL_CHARACTER = {
    red: '\x1b[31m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    magenta: '\x1b[35m',
    reset: '\x1b[0m',
};
class Logger {
    static replaceColorTags(message) {
        try {
            message = message.replace(/<magenta>/g, OUTPUT_CONTROL_CHARACTER.magenta);
            message = message.replace(/<\/magenta>/g, OUTPUT_CONTROL_CHARACTER.reset);
            message = message.replace(/<debug>/g, OUTPUT_CONTROL_CHARACTER.magenta);
            message = message.replace(/<\/debug>/g, OUTPUT_CONTROL_CHARACTER.reset);
            message = message.replace(/<blue>/g, OUTPUT_CONTROL_CHARACTER.blue);
            message = message.replace(/<\/blue>/g, OUTPUT_CONTROL_CHARACTER.reset);
            message = message.replace(/<info>/g, OUTPUT_CONTROL_CHARACTER.blue);
            message = message.replace(/<\/info>/g, OUTPUT_CONTROL_CHARACTER.reset);
            message = message.replace(/<green>/g, OUTPUT_CONTROL_CHARACTER.green);
            message = message.replace(/<\/green>/g, OUTPUT_CONTROL_CHARACTER.reset);
            message = message.replace(/<success>/g, OUTPUT_CONTROL_CHARACTER.green);
            message = message.replace(/<\/success>/g, OUTPUT_CONTROL_CHARACTER.reset);
            message = message.replace(/<yellow>/g, OUTPUT_CONTROL_CHARACTER.yellow);
            message = message.replace(/<\/yellow>/g, OUTPUT_CONTROL_CHARACTER.reset);
            message = message.replace(/<warning>/g, OUTPUT_CONTROL_CHARACTER.yellow);
            message = message.replace(/<\/warning>/g, OUTPUT_CONTROL_CHARACTER.reset);
            message = message.replace(/<red>/g, OUTPUT_CONTROL_CHARACTER.red);
            message = message.replace(/<\/red>/g, OUTPUT_CONTROL_CHARACTER.reset);
            message = message.replace(/<error>/g, OUTPUT_CONTROL_CHARACTER.red);
            message = message.replace(/<\/error>/g, OUTPUT_CONTROL_CHARACTER.reset);
        }
        catch { }
        return message;
    }
    static convertMessage(message) {
        return this.replaceColorTags(message);
    }
    static convertMessages(messages) {
        return messages.map((m) => this.replaceColorTags(m));
    }
    static debug(...messages) {
        if (constants_1.VERSION.includes('dev') || constants_1.VERSION.includes('beta') || constants_1.VERSION.includes('test') || process.env.YTDL_DEBUG) {
            console.log(this.convertMessage('<debug>[  DEBUG  ]:</debug>'), ...this.convertMessages(messages));
        }
    }
    static info(...messages) {
        console.info(this.convertMessage('<info>[  INFO!  ]:</info>'), ...this.convertMessages(messages));
    }
    static success(...messages) {
        console.log(this.convertMessage('<success>[ SUCCESS ]:</success>'), ...this.convertMessages(messages));
    }
    static warning(...messages) {
        console.warn(this.convertMessage('<warning>[ WARNING ]:</warning>'), ...this.convertMessages(messages));
    }
    static error(...messages) {
        console.error(this.convertMessage('<error>[  ERROR  ]:</error>'), ...this.convertMessages(messages));
    }
}
exports.Logger = Logger;
//# sourceMappingURL=Log.js.map