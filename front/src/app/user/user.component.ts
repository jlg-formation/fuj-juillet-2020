import { FormControl } from '@angular/forms';
import {
  ColorSchemeService,
  AuthenticationService,
} from '@jlguenego/angular-tools';
import { Router } from '@angular/router';
import { Component } from '@angular/core';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent {
  hue = new FormControl(this.getHue());
  constructor(
    public authenticationService: AuthenticationService,
    private router: Router,
    public colorSchemeService: ColorSchemeService
  ) {
    this.hue.valueChanges.subscribe((hue) => {
      this.colorSchemeService.updateHue(+hue);
    });
  }

  logout(): void {
    console.log('about to logout');
    this.authenticationService.disconnect().subscribe({
      next: () => {
        this.router.navigateByUrl('/');
      },
    });
  }

  getHue() {
    return this.colorSchemeService.hue$.value;
  }
}
