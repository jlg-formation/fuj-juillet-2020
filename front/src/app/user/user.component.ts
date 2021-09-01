import { Router } from '@angular/router';
import { UserService } from './../services/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
  constructor(public userService: UserService, private router: Router) {}

  ngOnInit(): void {}

  logout(): void {
    console.log('about to logout');
    this.userService.disconnect().subscribe({
      next: () => {
        this.router.navigateByUrl('/');
      },
    });
  }
}
