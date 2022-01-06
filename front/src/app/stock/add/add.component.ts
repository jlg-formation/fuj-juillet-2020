import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { faCircleNotch, faPlus } from '@fortawesome/free-solid-svg-icons';
import {
  DuplicateAsyncValidator,
  FileService,
  JlgValidators,
} from '@jlguenego/angular-tools';
import { delay, lastValueFrom } from 'rxjs';
import { Article } from 'src/app/interfaces/article';
import { ArticleService } from '../../services/article.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss'],
})
export class AddComponent {
  error = '';
  f = new FormGroup({
    name: new FormControl('toto', {
      validators: [
        Validators.required,
        Validators.maxLength(20),
        Validators.minLength(3),
      ],
      asyncValidators: [
        this.duplicateAsyncValidator.validate(
          (val: string) => '/api/articles?filter[name]=' + val
        ),
      ],
    }),
    price: new FormControl(1.23, [Validators.required]),
    qty: new FormControl(1, [Validators.required, JlgValidators.integer]),
  });
  faCircleNotch = faCircleNotch;
  faPlus = faPlus;
  files: File[] = [];
  isAdding = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private articleService: ArticleService,
    private duplicateAsyncValidator: DuplicateAsyncValidator,
    private fileService: FileService
  ) {}

  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      this.files = event.target.files;
    }
  }

  submit(): void {
    (async () => {
      try {
        this.isAdding = true;
        const article = this.f.value as Article;
        article.images = [];
        for (const file of this.files) {
          console.log('file: ', file);
          const newName =
            'file-' +
            Date.now() +
            '-' +
            Math.floor(Math.random() * 1e9) +
            '.' +
            getExtension(file.type);
          const renamedFile = new File([file], newName, {
            type: file.type,
            lastModified: file.lastModified,
          });
          console.log('renamedFile: ', renamedFile);

          await this.fileService.add(renamedFile, {
            compress: {
              maxSizeMB: 1,
              maxWidthOrHeight: 1920,
              useWebWorker: true,
            },
          });

          article.images.push(this.fileService.getUrl(newName));
        }

        await lastValueFrom(this.articleService.add(article).pipe(delay(20)));
        this.router.navigate(['..'], { relativeTo: this.route });
        this.isAdding = false;
      } catch (err) {
        this.isAdding = false;
        alert('Réponse du serveur :\n' + (err as Error).message);
      }
    })();
  }
}

const getExtension = (mimeType: string) => {
  const dico: { [key: string]: string } = {
    'image/jpeg': 'jpg',
  };
  return dico[mimeType];
};
