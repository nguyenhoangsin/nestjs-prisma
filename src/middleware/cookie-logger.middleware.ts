import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class CookieLoggerMiddleware implements NestMiddleware {
  private readonly logger = new Logger(CookieLoggerMiddleware.name);

  use(req: Request, res: Response, next: NextFunction) {
    // Log cookies sent from client to server
    this.logger.log(`CLIENT: ${JSON.stringify(req.cookies)}`);

    // Log cookies that will be sent from server to client
    res.on('finish', () => {
      const setCookieHeader = res.getHeaders()['set-cookie'];
      if (setCookieHeader) {
        this.logger.log(`SERVER: ${JSON.stringify(setCookieHeader)}`);
      }
    });

    next();
  }
}
