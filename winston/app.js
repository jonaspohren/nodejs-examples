const winston = require('winston');
const winstonDailyRotateFile = require('winston-daily-rotate-file');
const fecha = require('fecha');

const config = winston.config;
const logger = new winston.Logger({
    transports: [
        new winston.transports.File({
            name: 'file-info',
            filename: 'combined.log',
            level: 'info',
            json: false
        }),
        new winston.transports.File({
            name: 'file-error',
            filename: 'error.log',
            level: 'error',
            json: false,
            formatter: (options) => {
                return `${fecha.format(Date.now(), 'DD-MM-YYYY HH:mm:ss.SSS')} ${options.message}`;
            }
        }),
        new winston.transports.DailyRotateFile({
            name: 'file-daily',
            filename: 'application-%DATE%.log',
            datePattern: 'YYYY-MM-DD',
            zippedArchive: true,
            dirname: '.',
            maxsize: '50m',
            maxFiles: '20d',
            formatter: (options) => {
                return `${fecha.format(Date.now(), 'HH:mm:ss.SSS')} [${options.level.toUpperCase()}] ${options.message}`;
            }
        }),
        new winston.transports.Console({
            name: 'console-info',
            level: 'info',
            formatter: (options) => {
                return config.colorize(options.level, `${fecha.format(Date.now(), 'HH:mm:ss.SSS')} [${options.level.toUpperCase()}] ${options.message}`);
            }
        })
    ]
});

logger.error('Error!');
logger.info('Info!');
logger.warn('Warning!');