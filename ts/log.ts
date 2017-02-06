/* export function log(...args: string[]) {
	console.log.apply(console, args);
	//console.log('sdfsdf');
} */

export enum LogLevel {
	TRACE,
	DEBUG,
	INFO,
	WARN,
	ERROR,
	FATAL
}

export class Log {
	private loggers: Logger[] = [];
	constructor (private tag: string, private format: string) {
	}
	info(...args: any[]) {
		return this.append(LogLevel.INFO, args);
	}
	error(...args: any[]) {
		return this.append(LogLevel.ERROR, args);
	}
	warn(...args: any[]) {
		return this.append(LogLevel.WARN, args);
	}
	append(level: LogLevel, args: any[]) {
		let date = new Date();
		let day = new Date();
		if (!this.format) this.format = '%c%n\t%t\t%l\t%m';
		let item = {
			tag: this.tag,
			when: date,
			day: day,
			level: level,
			args: args,
			format: this.format
		}
		for (let logger of this.loggers) {
			logger.append(item);
		}
		return this;
	}
	addLogger(logger: Logger) {
		this.loggers.push(logger);
		return this;
	}
}

export interface Logger {
	append(item: LogItem): void
}

export interface LogItem {
	tag: string
	when: Date
	day: Date
	level: LogLevel
	args: any[]
	format: string
}

export class ConsoleLogger implements Logger {
	append(item: LogItem) {
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
	private logColor(item: LogItem): string {
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
	private serializeLogItem(item: LogItem): any {
		let text = item.format;
		let str = '';
		for (let i=0; i<text.length; i++) {
			if (text[i] === '%') {
				switch (text[i+1]) {
					case 'm':
						str += `${ item.args }`;
						break;
					case 't':
						str += `${ this.formatTime(item.when)}`;
						break;
					case 'l':
						str += `${ LogLevel[item.level] }`;
						break;
					case 'n':
						str += `${ item.tag }`;
						break;
					case 'd':
						str += `${ this.formatDate(item.day) }`;
						break;
					case 'c':
						str += `${ this.logColor(item) }`;
						break;
				}
			}
			else if (text[i] == '\t') str += '\t';
		}
		return str;
	}
	private formatTime(date: Date): string {
		return `${ this.alignNumber(date.getHours(), 2) }:${ this.alignNumber(date.getMinutes(), 2) }:${ this.alignNumber(date.getSeconds(), 2) }.${ this.alignNumber(date.getMilliseconds(), 3) }`;
	}
	private formatDate(date: Date): string {
		return `${ this.alignNumber(date.getDate(), 2) }-${ this.alignNumber(date.getMonth() + 1, 2) }-${ this.alignNumber(date.getFullYear(), 4) }`;
	}
	private alignNumber(num: number, length: number): string {
		let str = num.toString();
		while (str.length < length) {
			str = '0' + str;
		}
		return str;
	}
}
export class UdpLogger implements Logger {
	append(item: LogItem) {
// ..
	}
}

		/*let text = item.format
					.replace(/%t/g, `${ this.formatTime(item.when)}`)
					.replace(/%l/g, `${ LogLevel[item.level] }`)
					.replace(/%n/g, `${ item.tag }`)
					.replace(/%c/g, `${ this.logColor(item) }`)
					.replace(/%d/g, `${ this.formatDate(item.day) }`)
					.replace(/%m/g, `${ item.args }`); */