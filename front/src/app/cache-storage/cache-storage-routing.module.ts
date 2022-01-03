import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CacheStorageComponent } from './cache-storage.component';

const routes: Routes = [{ path: '', component: CacheStorageComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CacheStorageRoutingModule { }
