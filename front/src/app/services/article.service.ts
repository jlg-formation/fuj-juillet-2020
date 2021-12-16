import { Injectable } from '@angular/core';
import { CrudService } from '@jlguenego/angular-tools';
import { Article } from '../interfaces/article';

@Injectable({
  providedIn: 'root',
})
export class ArticleService extends CrudService<Article> {
  getEndpoint(): string {
    return '/api/articles';
  }
}
