export declare enum LogLevel {
    TRACE = 0,
    DEBUG = 1,
    INFO = 2,
    WARN = 3,
    ERROR = 4,
    FATAL = 5,
}
export declare class Log {
    private tag;
    private format;
    private loggers;
    constructor(tag: string, format: string);
    info(...args: any[]): this;
    error(...args: any[]): this;
    warn(...args: any[]): this;
    append(level: LogLevel, args: any[]): this;
    addLogger(logger: Logger): this;
}
export interface Logger {
    append(item: LogItem): void;
}
export interface LogItem {
    tag: string;
    when: Date;
    day: Date;
    level: LogLevel;
    args: any[];
    format: string;
}
export declare class ConsoleLogger implements Logger {
    append(item: LogItem): void;
    private logColor(item);
    private serializeLogItem(item);
    private formatTime(date);
    private formatDate(date);
    private alignNumber(num, length);
}
export declare class UdpLogger implements Logger {
    append(item: LogItem): void;
}
