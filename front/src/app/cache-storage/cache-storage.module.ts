import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CacheStorageRoutingModule } from './cache-storage-routing.module';
import { CacheStorageComponent } from './cache-storage.component';


@NgModule({
  declarations: [
    CacheStorageComponent
  ],
  imports: [
    CommonModule,
    CacheStorageRoutingModule
  ]
})
export class CacheStorageModule { }
