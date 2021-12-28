import { AddComponent } from './add/add.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StockComponent } from './stock.component';
import { AuthorizationGuard } from '../guards/authorization.guard';
import { AuthenticationGuard } from '@jlguenego/angular-tools';

const routes: Routes = [
  {
    path: '',
    component: StockComponent,
    canActivate: [AuthenticationGuard, AuthorizationGuard],
  },
  {
    path: 'add',
    component: AddComponent,
    canActivate: [AuthenticationGuard, AuthorizationGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StockRoutingModule {}
