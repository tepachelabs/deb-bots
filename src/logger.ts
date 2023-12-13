import winston from 'winston';

const isProd = process.env.NODE_ENV === 'production'

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  defaultMeta: { service: 'user-service' },
  transports: isProd 
  // prod logs
  ? [
    new winston.transports.File({ filename: './logs/error.log', level: 'error' }),
    new winston.transports.File({ filename: './logs/combined.log' }),
  ] 
  // other logs
  : [],
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.simple(),
  }));
}

export default logger;