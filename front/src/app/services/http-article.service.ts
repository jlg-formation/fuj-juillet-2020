import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Article } from '../interfaces/article';
import { ArticleService } from './article.service';

const url = '/api/articles';

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
          console.log('err: ', err);
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
        console.log('err: ', err);
        alert('oups! Error from server...');
        this.refresh();
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
        console.log('err: ', err);
        alert('oups! Error from server...');
        this.refresh();
      },
      complete: () => {
        console.log('complete');
      },
    });
  }
}
