import { FormControl } from '@angular/forms';
import { ColorSchemeService } from '@jlguenego/angular-tools';
import { Router } from '@angular/router';
import { UserService } from './../services/user.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent {
  hue = new FormControl(this.getHue());
  constructor(
    public userService: UserService,
    private router: Router,
    public colorSchemeService: ColorSchemeService
  ) {}

  logout(): void {
    console.log('about to logout');
    this.userService.disconnect().subscribe({
      next: () => {
        this.router.navigateByUrl('/');
      },
    });
  }

  getHue() {
    return this.colorSchemeService.hue$.value;
  }

  updateHue() {
    const hue = +this.hue.value;
    this.colorSchemeService.updateHue(hue);
  }
}
