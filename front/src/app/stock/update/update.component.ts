import { ArticleService } from './../../services/article.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import {
  DuplicateAsyncValidator,
  JlgValidators,
} from '@jlguenego/angular-tools';
import { faPen, faCircleNotch } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss'],
})
export class UpdateComponent {
  f = new FormGroup({
    name: new FormControl('', {
      validators: [
        Validators.required,
        Validators.maxLength(20),
        Validators.minLength(3),
      ],
    }),
    price: new FormControl(undefined, [Validators.required]),
    qty: new FormControl(undefined, [
      Validators.required,
      JlgValidators.integer,
    ]),
  });
  faCircleNotch = faCircleNotch;
  faPen = faPen;
  isUpdating = false;

  constructor(
    private duplicateAsyncValidator: DuplicateAsyncValidator,
    private articleService: ArticleService
  ) {}

  submit() {}
}
