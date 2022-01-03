import { ArticleService } from './../services/article.service';
import { Component } from '@angular/core';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-cache-storage',
  templateUrl: './cache-storage.component.html',
  styleUrls: ['./cache-storage.component.scss'],
})
export class CacheStorageComponent {
  constructor(public articleService: ArticleService) {}
  addImages() {
    (async () => {
      try {
        console.log('adding all articles images');
        const articles = this.articleService.documents$.value;
        console.log('articles: ', articles);
        if (articles.length === 0) {
          await lastValueFrom(this.articleService.retrieveAll());
        }

        const cache = await window.caches.open('jlg');
        articles.forEach((a) => {
          console.log('a.image: ', a.image);
          if (!a.image) {
            return;
          }
          cache.add(a.image);
        });
      } catch (err) {
        console.error('err: ', err);
      }
    })();
  }
}
