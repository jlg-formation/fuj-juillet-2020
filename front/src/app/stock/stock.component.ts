import { FormControl } from '@angular/forms';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  faAddressCard,
  faCircleNotch,
  faFilePdf,
  faImage,
  faList,
  faPlus,
  faSync,
  faTrashAlt,
} from '@fortawesome/free-solid-svg-icons';
import {
  AuthenticationService,
  AuthorizationService,
  FilterService,
} from '@jlguenego/angular-tools';
import { saveAs } from 'file-saver';
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
  articles: Article[] = [];
  error = '';
  faAddressCard = faAddressCard;
  faCircleNotch = faCircleNotch;
  faFilePdf = faFilePdf;
  faImage = faImage;
  faList = faList;
  faPlus = faPlus;
  faSync = faSync;
  faTrashAlt = faTrashAlt;
  isExporting = false;
  isLoading = false;
  isRemoving = false;
  selectedArticles = new Set<Article>();
  showMode: ShowMode = 'card';
  filter = new FormControl('');

  constructor(
    public articleService: ArticleService,
    public authorizationService: AuthorizationService,
    private authenticationService: AuthenticationService,
    private router: Router,
    private http: HttpClient,
    private filterService: FilterService
  ) {
    this.articleService.documents$.subscribe((documents) => {
      console.log('emit documents', documents);
      this.articles = [...documents]
        .reverse()
        .filter((d) => this.filterService.match(this.filter.value, d));
    });
    this.filter.valueChanges.subscribe(() => {
      this.articles = [...this.articleService.documents$.value]
        .reverse()
        .filter((d) => this.filterService.match(this.filter.value, d));
    });
  }

  exportToPDF() {
    (async () => {
      try {
        this.isExporting = true;
        const a = [...this.selectedArticles][0];
        console.log('export to PDF', a);
        const response = await lastValueFrom(
          this.http.post('/api/pdf/article', a, {
            observe: 'response',
            responseType: 'blob',
          })
        );
        if (response.body === null) {
          throw new Error('body is null');
        }
        this.isExporting = false;
        const pdfBlob = response.body;
        saveAs(pdfBlob, 'article.pdf');
      } catch (err) {
        this.isExporting = false;
        console.error('err: ', err);
      }
    })();
  }

  getImage(url: string) {
    console.log('getImage: ', url);
    return url;
  }

  ngOnInit(): void {
    this.refresh();
  }

  refresh() {
    (async () => {
      try {
        this.isLoading = true;
        await lastValueFrom(this.articleService.retrieveAll().pipe(delay(0)));
        this.isLoading = false;
      } catch (err) {
        this.isLoading = false;
        console.error('err: ', err);
        if (err instanceof HttpErrorResponse) {
          if (err.status === 403) {
            this.error = "Désolé mais vous n'êtes pas autorisé...";
            return;
          }
          if (err.status === 401) {
            await lastValueFrom(
              this.authenticationService.setAfterLoginRoute(
                window.location.pathname
              )
            );
            this.router.navigateByUrl('/user/login');
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
