import { Component } from '@angular/core';
import {
  faGithub,
  faGoogle,
  faMicrosoft,
} from '@fortawesome/free-brands-svg-icons';
import { faSmileWink } from '@fortawesome/free-regular-svg-icons';
import { Oauth2Service } from '@jlguenego/angular-tools';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  faGithub = faGithub;
  faMicrosoft = faMicrosoft;
  faGoogle = faGoogle;

  faSmileWink = faSmileWink;
  constructor(public oauth2Service: Oauth2Service) {}
}
