import { Component, OnInit } from '@angular/core';
import { Article } from '../interfaces/article';
import { ArticleService } from './../services/article.service';
import { AuthorizationService } from './../services/authorization.service';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.scss'],
})
export class StockComponent implements OnInit {
  error = '';
  isLoading = false;
  isRemoving = false;
  selectedArticles = new Set<Article>();

  constructor(
    public articleService: ArticleService,
    public authorizationService: AuthorizationService
  ) {}

  ngOnInit(): void {
    this.refresh();
  }

  refresh() {
    (async () => {
      try {
        this.isLoading = true;
        await this.articleService.retrieveAll().toPromise();
        this.isLoading = false;
      } catch (err) {
        this.isLoading = false;
        this.error = (err as Error).message;
      }
    })();
  }

  remove() {
    (async () => {
      try {
        this.isRemoving = true;
        await this.articleService.remove(this.selectedArticles).toPromise();
        this.selectedArticles.clear();
        this.isRemoving = false;
        await this.articleService.retrieveAll().toPromise();
      } catch (err) {
        this.isRemoving = false;
        this.error = (err as Error).message;
      }
    })();
  }

  toggle(a: Article) {
    if (this.selectedArticles.has(a)) {
      this.selectedArticles.delete(a);
      return;
    }
    this.selectedArticles.add(a);
  }
}
