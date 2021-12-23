import {
  HttpErrorResponse,
  HttpEvent,
  HttpEventType,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { OfflineService } from '@jlguenego/angular-tools';

@Injectable()
export class OfflineInterceptor implements HttpInterceptor {
  constructor(private offlineService: OfflineService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      tap({
        next: (response) => {
          console.log('offline interceptor response: ', response);
          if (
            [HttpEventType.Sent, HttpEventType.User].includes(response.type)
          ) {
            return;
          }
          this.offlineService.set('online');
        },
        error: (error) => {
          console.log('offline interceptor error: ', error);
          if (error instanceof HttpErrorResponse) {
            if ([0, 504].includes(error.status)) {
              console.log('response.status: ', error.status);
              this.offlineService.set('offline');
              return;
            }
            this.offlineService.set('online');
          }
        },
      })
    );
  }
}
