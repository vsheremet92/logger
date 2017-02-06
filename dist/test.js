"use strict";
const log_1 = require("./log");
function restService() {
    var log = new log_1.Log('restService', '%c%t\t%d\t%l\t%n\t%m').addLogger(new log_1.ConsoleLogger());
    try {
        log.info(`Started restService`, true, {});
        log.warn('war');
        log.info('Started !111');
        throw new Error('%m');
    }
    catch (err) {
        log.error(err);
    }
}
function botService() {
    var log = new log_1.Log('botService', '').addLogger(new log_1.ConsoleLogger());
    try {
        log.info(`Started botService`, true, {});
        log.info('Started !111').error('swedfwd');
    }
    catch (err) {
        log.error(err);
    }
}
restService();
botService();
//# sourceMappingURL=test.js.map