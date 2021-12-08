import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { delay, tap } from 'rxjs/operators';
import { Article } from '../interfaces/article';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  articles$ = new BehaviorSubject<Article[]>([]);

  constructor() {
    this.articles$.subscribe((articles) => {
      localStorage.setItem('articles', JSON.stringify(articles));
    });
  }

  add(article: Article): Observable<void> {
    const articles = [...this.articles$.value, article];
    this.articles$.next(articles);
    return of(undefined);
  }

  getArticles(): Article[] {
    const str = localStorage.getItem('articles');
    if (!str) {
      return [];
    }
    return JSON.parse(str) as Article[];
  }

  remove(selectedArticles: Set<Article>): Observable<void> {
    const articles = this.articles$.value.filter(
      (a) => !selectedArticles.has(a)
    );
    this.articles$.next(articles);
    return of(undefined).pipe(delay(2000));
  }

  retrieveAll(): Observable<void> {
    return of(undefined).pipe(
      delay(2000),
      tap(() => {
        this.articles$.next(this.getArticles());
      })
    );
  }
}
