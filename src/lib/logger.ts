import * as winston from 'winston';

const level = () => {
  return process.env.NODE_ENV === 'dev' ? 'http' : 'info';
}

const Logger = winston.createLogger({
  level: 'http',
  format: winston.format.combine(
    winston.format.json(),

    winston.format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss:ms',
    }),

    winston.format.printf(({ level, message, timestamp }) => {
      return `${timestamp} ${level}: ${message}`;
    }),
  ),
  transports: [
    new winston.transports.Console({
      format: winston.format.json(),
    }),
  ],
});
  
export default Logger