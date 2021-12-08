import { Router } from '@angular/router';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, map, tap, timeout } from 'rxjs/operators';
import { Article } from '../interfaces/article';
import { ArticleService } from './article.service';
import { Observable } from 'rxjs';

const url = '/api/articles';

@Injectable({
  providedIn: 'root',
})
export class HttpArticleService extends ArticleService {
  constructor(private http: HttpClient, private router: Router) {
    super();
  }

  httpError(err: unknown) {
    console.log('err: ', err);
    if (err instanceof HttpErrorResponse) {
      if (err.status === 403) {
        this.router.navigateByUrl('/403');
        return;
      }
      if (err.status === 400) {
        alert('bad request...' + err.error);
        return;
      }
    }
  }

  add(article: Article) {
    return this.http.post<void>(url, article).pipe(delay(2000), timeout(5000));
  }

  remove(selectedArticles: Set<Article>): Observable<void> {
    super.remove(selectedArticles).subscribe();
    const ids = [...selectedArticles].map((a) => a.id);
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: ids,
    };
    return this.http
      .delete<void>(url, options)
      .pipe(delay(2000), timeout(5000));
  }

  retrieveAll(): Observable<void> {
    return this.http.get<Article[]>(url).pipe(
      delay(2000),
      timeout(5000),
      map((articles) => {
        this.articles$.next(articles);
        return undefined;
      })
    );
  }
}
