import { ArticleService } from './../../services/article.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Article } from 'src/app/interfaces/article';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss'],
})
export class AddComponent implements OnInit {
  isAdding = false;
  error = '';
  f = new FormGroup({
    name: new FormControl('toto', [Validators.required]),
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
        await this.articleService.add(this.f.value as Article).toPromise();

        this.router.navigate(['..'], { relativeTo: this.route });
        this.isAdding = false;
      } catch (err) {
        this.isAdding = false;
        this.error = (err as Error).message;
      }
    })();
  }
}
