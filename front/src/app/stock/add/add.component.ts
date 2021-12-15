import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { faCircleNotch, faPlus } from '@fortawesome/free-solid-svg-icons';
import {
  DuplicateAsyncValidatorService,
  JlgValidators,
} from '@jlguenego/angular-tools';
import { delay, lastValueFrom } from 'rxjs';
import { Article } from 'src/app/interfaces/article';
import { ArticleService } from '../../services/article.service';
import { FileService } from '../../services/file.service';

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
    image: new FormControl('', []),
    imageFile: new FormControl(),
  });

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private articleService: ArticleService,
    private duplicateAsyncValidatorService: DuplicateAsyncValidatorService,
    private fileService: FileService
  ) {}

  onFileChange(event: any) {
    console.log('event: ', event);
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      console.log('file: ', file);
      this.f.patchValue({
        imageFile: file,
      });
    }
  }

  submit(): void {
    (async () => {
      try {
        console.log('submit');
        this.isAdding = true;
        if (this.f.controls['imageFile']) {
          await lastValueFrom(
            this.fileService.add(this.f.controls['imageFile']).pipe(delay(20))
          );
        }
        await lastValueFrom(
          this.articleService.add(this.f.value as Article).pipe(delay(20))
        );
        this.router.navigate(['..'], { relativeTo: this.route });
        this.isAdding = false;
      } catch (err) {
        this.isAdding = false;
        alert('Réponse du serveur :\n' + (err as Error).message);
      }
    })();
  }
}
