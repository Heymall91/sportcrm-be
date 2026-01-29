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
import { Response } from 'express';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const i18n = I18nContext.current(context);

    return next.handle().pipe(
      map((response) => this.responseHandler(response, i18n)),

      catchError((error: HttpException) =>
        throwError(() => this.errorHandler(error, context, i18n)),
      ),
    );
  }

  errorHandler(
    exception: HttpException,
    context: ExecutionContext,
    i18n?: I18nContext,
  ) {
    const ctx = context.switchToHttp();
    const response = ctx.getResponse<Response>();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    response.status(status).json({
      statusCode: i18n
        ? i18n.t(`error-names.${exception.name}`, { lang: i18n.lang })
        : exception.name,
      message: i18n
        ? i18n.t(`error-messages.${exception.message}`, { lang: i18n.lang })
        : exception.message,
    });
  }

  responseHandler<T>(response: T, i18n?: I18nContext) {
    return {
      data: response,
      message: i18n
        ? i18n.t('success-message.Success', { lang: i18n.lang })
        : 'Success',
    };
  }
}
