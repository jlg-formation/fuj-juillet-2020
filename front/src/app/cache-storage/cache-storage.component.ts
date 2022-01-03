import { Component } from '@angular/core';

// const KEY = 'uploads:cache';
const KEY = 'jlg';

@Component({
  selector: 'app-cache-storage',
  templateUrl: './cache-storage.component.html',
  styleUrls: ['./cache-storage.component.scss'],
})
export class CacheStorageComponent {
  cacheUrls: string[] = [];
  constructor() {
    (async () => {
      const keys = await window.caches.keys();
      const key = keys.find((k) => k.match(KEY));
      if (!key) {
        console.log('no key found.');
        return;
      }
      const cache = await window.caches.open(key);
      this.cacheUrls = (await cache.keys()).map((r) => r.url);
    })();
  }
}
