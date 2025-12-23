import {
  CallHandler,
  ExecutionContext,
  HttpStatus,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> {
    const ctx = context.switchToHttp();
    const res = ctx.getResponse();
    const req = ctx.getRequest();

    return next.handle().pipe(
      map((data) => {
        if (req.method === 'POST' && res.statusCode === HttpStatus.CREATED)
          res.status(HttpStatus.OK);
        return {
          code: res.statusCode,
          status: 'SUCCEED',
          message: 'here you go.',
          error: null,
          data,
        };
      }),
    );
  }
}
