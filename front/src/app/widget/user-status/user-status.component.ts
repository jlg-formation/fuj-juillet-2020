import { Oauth2Service } from './../../services/oauth2.service';
import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-status',
  templateUrl: './user-status.component.html',
  styleUrls: ['./user-status.component.scss'],
})
export class UserStatusComponent {
  constructor(
    public userService: UserService,
    public oauth2Service: Oauth2Service
  ) {}
}
