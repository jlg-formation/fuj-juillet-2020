import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

// const KEY = 'uploads:cache';
const KEY = 'jlg';

@Injectable({
  providedIn: 'root',
})
export class CacheStorageService {
  url$ = new BehaviorSubject<string[]>([]);

  constructor() {}

  async remove(selectedUrls: Set<string>) {
    const keys = await window.caches.keys();
    const key = keys.find((k) => k.match(KEY));
    if (!key) {
      console.log('no key found.');
      return;
    }
    const cache = await window.caches.open(key);
    for (const url of selectedUrls) {
      await cache.delete(url);
    }
  }

  async retrieveAll(): Promise<void> {
    const keys = await window.caches.keys();
    const key = keys.find((k) => k.match(KEY));
    if (!key) {
      console.log('no key found.');
      this.url$.next([]);
      return;
    }
    const cache = await window.caches.open(key);
    const urls = (await cache.keys()).map((r) => r.url);
    this.url$.next(urls);
  }
}
