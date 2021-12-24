import { Component } from '@angular/core';
import { NetworkService } from '@jlguenego/angular-tools';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent {
  constructor(public networkService: NetworkService) {}
}
