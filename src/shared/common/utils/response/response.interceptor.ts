import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { I18nContext } from 'nestjs-i18n';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const i18n = I18nContext.current();
    return next.handle().pipe(
      map((res: any) => this.responseHandler(res)),
      catchError((err: HttpException) =>
        throwError(() => this.errorHandler(err, context, i18n)),
      ),
    );
  }

  errorHandler(
    exception: HttpException,
    context: ExecutionContext,
    i18n: I18nContext,
  ) {
    const ctx = context.switchToHttp();
    const response = ctx.getResponse();
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    response.status(status).json({
      error: i18n.t(`error-names.${exception.name}`, {
        lang: I18nContext.current().lang,
      }),
      message: i18n.t(`error-messages.${exception.message}`, {
        lang: I18nContext.current().lang,
      }),
    });
  }

  responseHandler(res: any) {
    return {
      data: res,
    };
  }
}
