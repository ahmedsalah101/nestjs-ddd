import { DomainError, Exception, Result } from '@common/core';
import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: Result<DomainError>, host: ArgumentsHost) {
    const res: Response = host.switchToHttp().getResponse();
    if (exception instanceof HttpException) {
      console.log('here');
      const status = exception.getStatus();
      res.status(status).json({
        message: exception.message,
        time: new Date().toISOString(),
      });
      return;
    }
    if (exception instanceof Exception) {
      const status = exception.code;
      res.status(status).json({
        message: exception.error,
        time: new Date().toISOString(),
      });
      return;
    }
    res.status(500).json({
      err: exception.error,
    });
  }
}
