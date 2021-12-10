import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { faCircleNotch, faPlus } from '@fortawesome/free-solid-svg-icons';
import {
  JlgValidators,
  DuplicateAsyncValidatorService,
} from '@jlguenego/angular-tools';
import { lastValueFrom } from 'rxjs';
import { Article } from 'src/app/interfaces/article';
import { ArticleService } from './../../services/article.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss'],
})
export class AddComponent {
  faPlus = faPlus;
  faCircleNotch = faCircleNotch;

  isAdding = false;
  error = '';
  f = new FormGroup({
    name: new FormControl('toto', {
      validators: [
        Validators.required,
        Validators.maxLength(10),
        Validators.minLength(3),
      ],
      asyncValidators: [
        this.duplicateAsyncValidatorService.validate(
          (val: string) => '/api/articles?filter[name]=' + val
        ),
      ],
    }),
    price: new FormControl(1.23, [Validators.required]),
    qty: new FormControl(1, [Validators.required, JlgValidators.integer]),
  });

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private articleService: ArticleService,
    private duplicateAsyncValidatorService: DuplicateAsyncValidatorService
  ) {}

  submit(): void {
    (async () => {
      try {
        console.log('submit');
        this.isAdding = true;
        await lastValueFrom(this.articleService.add(this.f.value as Article));
        this.router.navigate(['..'], { relativeTo: this.route });
        this.isAdding = false;
      } catch (err) {
        this.isAdding = false;
        alert('Erreur du serveur :\n' + (err as Error).message);
      }
    })();
  }
}
