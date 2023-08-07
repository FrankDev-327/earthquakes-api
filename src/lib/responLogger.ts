import * as winston from 'winston';
import { NextFunction, Request, Response } from 'express';

const responseLogger  = (req: Request, res: Response, next: NextFunction) => {
    const originalSend: Response['send'] = res.send.bind(res);
    const responseTimestamp = new Date();
    res.send = (body: any): Response<any>  => {
      winston.verbose(`Response Sent: ${responseTimestamp} ${req.method} ${req.originalUrl} - Status: ${res.statusCode}`);
      return originalSend(body);
    };
  
    next();
}

export default responseLogger;