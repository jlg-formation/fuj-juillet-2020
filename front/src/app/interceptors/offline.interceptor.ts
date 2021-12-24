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
import { NetworkService } from '@jlguenego/angular-tools';

@Injectable()
export class OfflineInterceptor implements HttpInterceptor {
  constructor(private networkService: NetworkService) {}

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
          this.networkService.set('online');
        },
        error: (error) => {
          console.log('offline interceptor error: ', error);
          if (error instanceof HttpErrorResponse) {
            if ([0, 504].includes(error.status)) {
              console.log('response.status: ', error.status);
              this.networkService.set('offline');
              return;
            }
            this.networkService.set('online');
          }
        },
      })
    );
  }
}
