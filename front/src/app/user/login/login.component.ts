import { Component, OnInit } from '@angular/core';
import { Oauth2Service } from '../../services/oauth2.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  constructor(public oauth2Service: Oauth2Service) {}
}
