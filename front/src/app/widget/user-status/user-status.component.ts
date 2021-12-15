import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {
  faCircleNotch,
  faSignInAlt,
  faUserCircle,
} from '@fortawesome/free-solid-svg-icons';
import { Oauth2Service } from './../../services/oauth2.service';
import { UserService } from './../../services/user.service';

@Component({
  selector: 'app-user-status',
  templateUrl: './user-status.component.html',
  styleUrls: ['./user-status.component.scss'],
})
export class UserStatusComponent {
  faUserCircle = faUserCircle;
  faSignInAlt = faSignInAlt;
  faCircleNotch = faCircleNotch;
  constructor(
    private router: Router,
    public userService: UserService,
    public oauth2Service: Oauth2Service
  ) {}

  connect() {
    console.log('this.router.url: ', this.router.url);
    this.userService.setAfterLoginRoute(this.router.url);
    this.router.navigateByUrl('/user/login');
  }
}
