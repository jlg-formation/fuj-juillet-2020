import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { faCircleNotch, faPlus } from '@fortawesome/free-solid-svg-icons';
import { lastValueFrom } from 'rxjs';
import { Article } from 'src/app/interfaces/article';
import { ArticleService } from './../../services/article.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss'],
})
export class AddComponent implements OnInit {
  faPlus = faPlus;
  faCircleNotch = faCircleNotch;

  isAdding = false;
  error = '';
  f = new FormGroup({
    name: new FormControl('toto', [
      Validators.required,
      Validators.maxLength(10),
      Validators.minLength(3),
    ]),
    price: new FormControl(1.23, [Validators.required]),
    qty: new FormControl(1, [Validators.required]),
  });

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private articleService: ArticleService
  ) {}

  ngOnInit(): void {}

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
