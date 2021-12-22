import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { OfflineService } from '../services/offline.service';

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
          this.offlineService.set('online');
        },
        error: (error) => {
          console.log('offline interceptor response: ', error);
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