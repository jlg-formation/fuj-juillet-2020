import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Article } from '../interfaces/article';
import { ArticleService } from './article.service';

import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class HttpArticleService extends ArticleService {
  constructor(private http: HttpClient) {
    super();
    console.log('instantiate http article');
    this.refresh();
  }

  refresh() {
    this.http
      .get<Article[]>('http://localhost:3000/api/articles')
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
        },
        error: (err) => {
          console.log('err: ', err);
        },
        complete: () => {
          console.log('complete');
        },
      });
  }
}
