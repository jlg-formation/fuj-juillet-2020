import { ArticleComponent } from './article/article.component';
import { AddComponent } from './add/add.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StockComponent } from './stock.component';
import {
  AuthenticationGuard,
  AuthorizationGuard,
} from '@jlguenego/angular-tools';

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
  {
    path: ':id',
    component: ArticleComponent,
    canActivate: [AuthenticationGuard, AuthorizationGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StockRoutingModule {}
