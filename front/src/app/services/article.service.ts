import { Injectable } from '@angular/core';
import { Article } from '../interfaces/article';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  articles: Article[] = [
    { name: 'Tournevis', price: 2.34, qty: 123 },
    { name: 'Marteau', price: 11, qty: 4567 },
    { name: 'Tondeuse à gazon', price: 234, qty: 3 },
    { name: 'Pelle', price: 1.23, qty: 5 },
  ];

  constructor() {}

  add(article: Article) {
    this.articles.push(article);
  }
}
