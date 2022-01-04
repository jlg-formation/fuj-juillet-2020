import { CacheStorageService } from './../services/cache-storage.service';
import { Component } from '@angular/core';
import { faCircleNotch, faSync } from '@fortawesome/free-solid-svg-icons';
import { faTrashAlt } from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'app-cache-storage',
  templateUrl: './cache-storage.component.html',
  styleUrls: ['./cache-storage.component.scss'],
})
export class CacheStorageComponent {
  faCircleNotch = faCircleNotch;
  faSync = faSync;
  faTrashAlt = faTrashAlt;
  isLoading = false;
  isRemoving = false;
  selectedUrls = new Set<string>();

  constructor(public cacheStorageService: CacheStorageService) {
    this.refresh();
  }

  async refresh() {
    this.isLoading = true;
    await this.cacheStorageService.retrieveAll();
    this.isLoading = false;
  }

  async remove() {
    this.isRemoving = true;
    await this.cacheStorageService.remove(this.selectedUrls);
    this.selectedUrls.clear();
    this.isRemoving = false;
    await this.cacheStorageService.retrieveAll();
  }

  toggle(url: string) {
    if (this.selectedUrls.has(url)) {
      this.selectedUrls.delete(url);
      return;
    }
    this.selectedUrls.add(url);
  }
}
