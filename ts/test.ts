import { Log, ConsoleLogger, UdpLogger } from "./log"
//import * as logmodule from "./log"

//logmodule.log('as module');
function restService() {
	var log = new Log('restService', '%c%t\t%d\t%l\t%n\t%m').addLogger(new ConsoleLogger());
	try {
		//log.addLogger(new UdpLogger());
		log.info(`Started restService`, true, {});
		log.warn('war');
		log.info('Started !111');
		throw new Error('%m');
	} catch (err) {
		log.error(err);
	}
}

function botService() {
	var log = new Log('botService', '').addLogger(new ConsoleLogger());
	try {
		//log.addLogger(new UdpLogger());
		log.info(`Started botService`, true, {});
		log.info('Started !111').error('swedfwd');
		//throw new Error('SOMEERR');
	} catch (err) {
		log.error(err);
	}
}
/*
format = '%c%t\t%n\t%l\t%m\t%t';
format = ttttt`${ item.dateString }\t${ item.levelString }`
function log(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
	let original = descriptor.value;
	descriptor.value = function() {
		console.log('Enter ' + propertyKey);
		let time = new Date().getTime();
		original.apply(this, arguments);
		console.log('Exit ' + propertyKey, 'time=' + (new Date().getTime() - time) + 'ms');
	}
}
class Foo {
	@log
	test() {
		console.log('sdfsd')

	}
}
var foo = new Foo();
foo.test();
*/
restService();
botService();