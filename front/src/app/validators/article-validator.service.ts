import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  AbstractControl,
  AsyncValidator,
  ValidationErrors,
} from '@angular/forms';
import { map, Observable, of } from 'rxjs';
import { Article } from '../interfaces/article';

@Injectable({
  providedIn: 'root',
})
export class ArticleValidatorService implements AsyncValidator {
  constructor(private http: HttpClient) {}
  validate(
    control: AbstractControl
  ): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    console.log('start to async validate', control.value);
    if (!control.value) {
      return of(null);
    }
    return this.http
      .get<Article[]>('/api/articles?filter[name]=' + control.value)
      .pipe(
        map((articles) => {
          console.log('articles: ', articles);
          if (articles.length > 0) {
            return { articleNameDuplicate: { value: control.value } };
          }
          return null;
        })
      );
  }
}
