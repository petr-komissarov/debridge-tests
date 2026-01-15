import {type LoggerOptions, pino} from "pino";
import {pinoCaller} from "pino-caller";
import {PinoPretty} from "pino-pretty";
import {settings} from "../models";

const log = (function () {
    const loggerOptions: LoggerOptions = {
        level: settings.logLevel,
        name: "deBridge",
        redact: ["password", "token"]
    };

    const options = {
        relativeTo: settings.rootPath
    };

    const pretty = PinoPretty({
        colorize: true,
        colorizeObjects: true,
        sync: false
    });

    return pinoCaller(pino(loggerOptions, pretty), options);
})();

export {log};
