import { AuthenticationGuard } from '@jlguenego/angular-tools';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './user.component';

const routes: Routes = [
  { path: '', component: UserComponent, canActivate: [AuthenticationGuard] },
  {
    path: 'login',
    component: LoginComponent,
    data: {
      title: 'Login',
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
