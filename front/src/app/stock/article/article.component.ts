import { lastValueFrom } from 'rxjs';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  faChevronLeft,
  faTrashAlt,
  faCircleNotch,
  faPen,
} from '@fortawesome/free-solid-svg-icons';
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
  faTrashAlt = faTrashAlt;
  faCircleNotch = faCircleNotch;
  isRemoving = false;
  faPen = faPen;

  constructor(
    private route: ActivatedRoute,
    private articleService: ArticleService,
    private router: Router
  ) {
    this.route.paramMap.subscribe((map) => {
      (async () => {
        console.log('map: ', map);
        const id = map.get('id');
        if (!id) {
          return;
        }
        if (this.articleService.documents$.value.length === 0) {
          this.article = await lastValueFrom(
            this.articleService.retrieveOne(id)
          );
          return;
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

  remove() {
    const answer = confirm(`Supprimer l'article ${this.article.name}?`);
    if (!answer) {
      return;
    }
    (async () => {
      try {
        this.isRemoving = true;
        await lastValueFrom(this.articleService.remove([this.article.id]));
        this.isRemoving = false;
        await this.router.navigate(['../..'], { relativeTo: this.route });
      } catch (err) {
        this.isRemoving = false;
        console.error('err: ', err);
      }
    })();
  }
}
