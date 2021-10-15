import { Router } from '@angular/router';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Article } from '../interfaces/article';
import { ArticleService } from './article.service';

const url = '/api/articles';

@Injectable({
  providedIn: 'root',
})
export class HttpArticleService extends ArticleService {
  constructor(private http: HttpClient, private router: Router) {
    super();
    console.log('instantiate http article');
    this.refresh();
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

  refresh() {
    this.http
      .get<Article[]>(url)
      .pipe(
        map((articles) => {
          articles.forEach(
            (a) =>
              (a.name =
                a.name.substring(0, 1).toUpperCase() + a.name.substring(1))
          );
          return articles;
        })
      )
      .subscribe({
        next: (articles) => {
          console.log('articles: ', articles);
          this.articles = articles;
          this.save();
        },
        error: (err) => {
          this.httpError(err);
        },
        complete: () => {
          console.log('complete');
        },
      });
  }

  add(article: Article) {
    super.add(article);
    this.http.post<void>(url, article).subscribe({
      next: () => {
        this.refresh();
      },
      error: (err) => {
        this.httpError(err);
      },
      complete: () => {
        console.log('complete');
      },
    });
  }

  remove(selectedArticles: Set<Article>) {
    super.remove(selectedArticles);
    const ids = [...selectedArticles].map((a) => a.id);
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: ids,
    };
    this.http.delete<void>(url, options).subscribe({
      next: () => {
        this.refresh();
      },
      error: (err) => {
        this.httpError(err);
        this.refresh();
      },
      complete: () => {
        console.log('complete');
      },
    });
  }
}
