import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {
  faCircleNotch,
  faSignInAlt,
  faUserCircle,
} from '@fortawesome/free-solid-svg-icons';
import { AuthenticationService } from '@jlguenego/angular-tools';
import { lastValueFrom } from 'rxjs';
import { Oauth2Service } from './../../services/oauth2.service';

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
    public authenticationService: AuthenticationService,
    public oauth2Service: Oauth2Service
  ) {}

  connect() {
    console.log('this.router.url: ', this.router.url);
    (async () => {
      try {
        await lastValueFrom(
          this.authenticationService.setAfterLoginRoute(this.router.url)
        );
        this.router.navigateByUrl('/user/login');
      } catch (err) {
        console.log('err: ', err);
      }
    })();
  }
}
