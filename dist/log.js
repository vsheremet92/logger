"use strict";
var LogLevel;
(function (LogLevel) {
    LogLevel[LogLevel["TRACE"] = 0] = "TRACE";
    LogLevel[LogLevel["DEBUG"] = 1] = "DEBUG";
    LogLevel[LogLevel["INFO"] = 2] = "INFO";
    LogLevel[LogLevel["WARN"] = 3] = "WARN";
    LogLevel[LogLevel["ERROR"] = 4] = "ERROR";
    LogLevel[LogLevel["FATAL"] = 5] = "FATAL";
})(LogLevel = exports.LogLevel || (exports.LogLevel = {}));
class Log {
    constructor(tag, format) {
        this.tag = tag;
        this.format = format;
        this.loggers = [];
    }
    info(...args) {
        return this.append(LogLevel.INFO, args);
    }
    error(...args) {
        return this.append(LogLevel.ERROR, args);
    }
    warn(...args) {
        return this.append(LogLevel.WARN, args);
    }
    append(level, args) {
        let date = new Date();
        let day = new Date();
        if (!this.format)
            this.format = '%c%n\t%t\t%l\t%m';
        let item = {
            tag: this.tag,
            when: date,
            day: day,
            level: level,
            args: args,
            format: this.format
        };
        for (let logger of this.loggers) {
            logger.append(item);
        }
        return this;
    }
    addLogger(logger) {
        this.loggers.push(logger);
        return this;
    }
}
exports.Log = Log;
class ConsoleLogger {
    append(item) {
        let text = this.serializeLogItem(item);
        switch (item.level) {
            case LogLevel.ERROR:
            case LogLevel.FATAL:
                console.error(text);
                break;
            case LogLevel.WARN:
                console.warn(text);
            default:
                console.log(text);
                break;
        }
    }
    logColor(item) {
        switch (item.level) {
            case LogLevel.ERROR:
            case LogLevel.FATAL:
                return '\x1b[31m';
            case LogLevel.WARN:
                return '\x1b[33m';
            case LogLevel.INFO:
                return '\x1b[0m';
        }
    }
    serializeLogItem(item) {
        let text = item.format;
        let str = '';
        for (let i = 0; i < text.length; i++) {
            if (text[i] === '%') {
                switch (text[i + 1]) {
                    case 'm':
                        str += `${item.args}`;
                        break;
                    case 't':
                        str += `${this.formatTime(item.when)}`;
                        break;
                    case 'l':
                        str += `${LogLevel[item.level]}`;
                        break;
                    case 'n':
                        str += `${item.tag}`;
                        break;
                    case 'd':
                        str += `${this.formatDate(item.day)}`;
                        break;
                    case 'c':
                        str += `${this.logColor(item)}`;
                        break;
                }
            }
            else if (text[i] == '\t')
                str += '\t';
        }
        return str;
    }
    formatTime(date) {
        return `${this.alignNumber(date.getHours(), 2)}:${this.alignNumber(date.getMinutes(), 2)}:${this.alignNumber(date.getSeconds(), 2)}.${this.alignNumber(date.getMilliseconds(), 3)}`;
    }
    formatDate(date) {
        return `${this.alignNumber(date.getDate(), 2)}-${this.alignNumber(date.getMonth() + 1, 2)}-${this.alignNumber(date.getFullYear(), 4)}`;
    }
    alignNumber(num, length) {
        let str = num.toString();
        while (str.length < length) {
            str = '0' + str;
        }
        return str;
    }
}
exports.ConsoleLogger = ConsoleLogger;
class UdpLogger {
    append(item) {
    }
}
exports.UdpLogger = UdpLogger;
//# sourceMappingURL=log.js.map