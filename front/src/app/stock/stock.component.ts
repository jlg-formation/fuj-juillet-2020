import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  faAddressCard,
  faCircleNotch,
  faImage,
  faList,
  faPlus,
  faSync,
  faTrashAlt,
} from '@fortawesome/free-solid-svg-icons';
import { AuthorizationService, CacheService } from '@jlguenego/angular-tools';
import { delay, lastValueFrom } from 'rxjs';
import { Article } from '../interfaces/article';
import { ArticleService } from './../services/article.service';

type ShowMode = 'detail' | 'card';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.scss'],
})
export class StockComponent implements OnInit {
  error = '';
  faAddressCard = faAddressCard;
  faCircleNotch = faCircleNotch;
  faImage = faImage;
  faList = faList;
  faPlus = faPlus;
  faSync = faSync;
  faTrashAlt = faTrashAlt;
  isLoading = false;
  isRemoving = false;
  selectedArticles = new Set<Article>();
  showMode: ShowMode = 'card';

  constructor(
    public articleService: ArticleService,
    public authorizationService: AuthorizationService,
    public cacheService: CacheService
  ) {
    this.articleService.documents$.subscribe((documents) => {
      console.log('emit documents', documents);
    });
  }

  getImage(url: string) {
    console.log('getImage: ', url);
    return url;
  }

  ngOnInit(): void {
    this.refresh();
  }

  onImgError(event: Event, a: Article) {
    console.log('event: ', event);
    // (event.target as HTMLImageElement).style.display = 'none';
    // (event.target as HTMLImageElement).src = 'assets/image-not-found.svg';
    console.log('onImgError');
    const img = event.target as HTMLImageElement;
    if (!a.image) {
      return;
    }
    this.cacheService.loadImage(img, a.image);
  }

  refresh() {
    (async () => {
      try {
        this.isLoading = true;
        await lastValueFrom(this.articleService.retrieveAll().pipe(delay(0)));
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
        const ids = [...this.selectedArticles].map((a) => a.id);
        await lastValueFrom(this.articleService.remove(ids));
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

  toggleShowMode() {
    this.showMode = this.showMode === 'detail' ? 'card' : 'detail';
    console.log(this.selectedArticles);
  }
}
