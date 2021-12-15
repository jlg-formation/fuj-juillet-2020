import { Component } from '@angular/core';
import { TitleService } from '@jlguenego/angular-tools';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(private titleService: TitleService) {
    this.titleService.setDefaultTitle('Gestion Stock');
  }
}
