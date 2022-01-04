import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CacheStorageRoutingModule } from './cache-storage-routing.module';
import { CacheStorageComponent } from './cache-storage.component';

@NgModule({
  declarations: [CacheStorageComponent],
  imports: [CommonModule, CacheStorageRoutingModule, FontAwesomeModule],
})
export class CacheStorageModule {}
