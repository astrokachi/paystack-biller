import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { FastifyReply, FastifyRequest } from 'fastify';

@Catch(HttpException)
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request: FastifyRequest = ctx.getRequest<FastifyRequest>();
    const response = ctx.getResponse<FastifyReply>();

    let status: number;
    let message: string | Record<any, any>;

    // use for looger
    // const requestDetails = {
    //   path: request.url,
    //   method: request.method,
    //   timestamp: new Date().toISOString(),
    // };

    // handle standard http
    if (exception instanceof HttpException) {
      status = exception.getStatus();
      message = exception.getResponse() || exception.message;

      // logger.error(statusCode: status, message, ...requestDetails)

      return response.status(status).send(message);
    }

    // else if ()

    // handle non custom error
    return response.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      message: 'Internal Server Error',
      path: request.url,
    });
  }
}
