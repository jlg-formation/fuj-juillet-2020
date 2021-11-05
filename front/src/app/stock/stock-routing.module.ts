import { AddComponent } from './add/add.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StockComponent } from './stock.component';
import { UserGuard } from '../guards/user.guard';
import { AuthorizationGuard } from '../guards/authorization.guard';

const routes: Routes = [
  {
    path: '',
    component: StockComponent,
    canActivate: [UserGuard, AuthorizationGuard],
  },
  {
    path: 'add',
    component: AddComponent,
    canActivate: [UserGuard, AuthorizationGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StockRoutingModule {}
