import { lastValueFrom } from 'rxjs';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { Article } from 'src/app/interfaces/article';
import { ArticleService } from './../../services/article.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
})
export class ArticleComponent {
  article!: Article;
  faChevronLeft = faChevronLeft;

  constructor(
    private route: ActivatedRoute,
    private articleService: ArticleService
  ) {
    this.route.paramMap.subscribe((map) => {
      (async () => {
        console.log('map: ', map);
        const id = map.get('id');
        if (!id) {
          return;
        }
        if (this.articleService.documents$.value.length === 0) {
          await lastValueFrom(this.articleService.retrieveAll());
        }
        const article = this.articleService.documents$.value.find(
          (a) => a.id === id
        );
        if (!article) {
          return;
        }
        this.article = article;
      })();
    });
  }
}
