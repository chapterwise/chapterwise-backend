// Logger
const winston = require('winston');
const { combine, timestamp, errors, json, prettyPrint, colorize, printf } = winston.format
const { generateUniqueString } = require("./utils/helper");

const generateRequestId = () => {
    return process.env.ENVIRONMENT == "development" ? null : generateUniqueString();
}

const customLogFormat = printf(({ level, message, timestamp, label, ...meta }) => {
    // const metaString = Object.keys(meta).length ? JSON.stringify(meta, null, 2) : '';
    return `${timestamp} [${level}]: ${message}`; //${metaString ? ` ${metaString}` : ''}
});

// 
const loggerConfig = {
    transports: [
        new winston.transports.Console({
            format : combine(timestamp(), errors({ stack: true }), colorize(), customLogFormat)
        }),
        new winston.transports.File({ filename: 'logs/app.log', format : combine(timestamp(), errors({ stack: true }), json(), prettyPrint()) }),
    ],
    defaultMeta: { requestId: generateRequestId() }
};

const logger = winston.createLogger({
    transports: loggerConfig.transports
});

module.exports = { loggerConfig, logger };