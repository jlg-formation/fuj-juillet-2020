import { ArticleService } from './../services/article.service';
import { Component, OnInit } from '@angular/core';
import { Article } from '../interfaces/article';

import { jsPDF } from 'jspdf';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.scss'],
})
export class StockComponent implements OnInit {
  selectedArticles = new Set<Article>();
  constructor(public articleService: ArticleService) {}

  ngOnInit(): void {}

  toggle(a: Article) {
    if (this.selectedArticles.has(a)) {
      this.selectedArticles.delete(a);
      return;
    }
    this.selectedArticles.add(a);
  }

  remove() {
    console.log('remove');
    this.articleService.remove(this.selectedArticles);
    this.selectedArticles.clear();
  }

  export() {
    console.log('export');
    const doc = new jsPDF();
    doc.text('Jspdf text!', 10, 10);
    doc.save('test.pdf');
  }
}
