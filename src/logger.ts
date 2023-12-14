import winston from 'winston';
import {Logtail} from "@logtail/node";
import {LogtailTransport} from "@logtail/winston";
import * as Transport from "winston-transport";

const isProd = process.env.NODE_ENV === 'production'

const transports: Transport[] = []
if (isProd) {
  transports.push(new winston.transports.File({filename: './logs/error.log', level: 'error'}))
  transports.push(new winston.transports.File({filename: './logs/combined.log'}))
  if (process.env.BETTERSTACK_LOGS_TOKEN) {
    transports.push(new LogtailTransport(new Logtail(process.env.BETTERSTACK_LOGS_TOKEN)))
  }
}

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  defaultMeta: {service: 'deb-bots'},
  transports,
});

// For all other environments than production, log to the `console` with the simple format.
if (!isProd) {
  logger.add(new winston.transports.Console({
    format: winston.format.simple(),
  }));
}

export default logger;
