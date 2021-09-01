import { LegalComponent } from './legal/legal.component';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'legal',
    component: LegalComponent,
  },
  {
    path: 'stock',
    loadChildren: () =>
      import('./stock/stock.module').then((m) => m.StockModule),
  },
  { path: 'user', loadChildren: () => import('./user/user.module').then(m => m.UserModule) },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules,
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
