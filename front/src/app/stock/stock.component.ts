import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  faCircleNotch,
  faPlus,
  faSync,
  faTrashAlt,
} from '@fortawesome/free-solid-svg-icons';
import { lastValueFrom } from 'rxjs';
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

  faSync = faSync;
  faPlus = faPlus;
  faTrashAlt = faTrashAlt;
  faCircleNotch = faCircleNotch;

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
        await lastValueFrom(this.articleService.retrieveAll());
        this.isLoading = false;
      } catch (err) {
        this.isLoading = false;
        console.log('err: ', err);
        if (err instanceof HttpErrorResponse) {
          if (err.status === 403) {
            this.error = "Désolé mais vous n'êtes pas autorisé...";
            return;
          }
        }
        this.error = (err as Error).message;
      }
    })();
  }

  remove() {
    (async () => {
      try {
        this.isRemoving = true;
        await lastValueFrom(this.articleService.remove(this.selectedArticles));
        this.selectedArticles.clear();
        this.isRemoving = false;
        await lastValueFrom(this.articleService.retrieveAll());
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
