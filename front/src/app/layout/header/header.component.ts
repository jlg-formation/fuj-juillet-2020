import { Component } from '@angular/core';
import { Oauth2Service } from '@jlguenego/angular-tools';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  constructor(public oauth2Service: Oauth2Service) {}
}
