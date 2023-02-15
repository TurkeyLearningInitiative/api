import {
  CallHandler,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class SizeLimitInterceptor implements NestInterceptor {
  private sizeLimit = 0;

  constructor(sizeLimit: number) {
    this.sizeLimit = sizeLimit;
  }

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const ctx = context.switchToHttp();
    const request = ctx.getRequest();
    const response = ctx.getResponse();
    const size = request.socket.bytesRead;

    if (size > this.sizeLimit) {
      throw new HttpException(
        'Request Entity Too Large Error',
        HttpStatus.PAYLOAD_TOO_LARGE,
      );
    }

    return next.handle();
  }
}
