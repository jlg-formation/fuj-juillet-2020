import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  firstValueFrom,
  map,
  Observable,
  ReplaySubject,
  Subject,
  timer,
} from 'rxjs';
import { Article } from '../interfaces/article';

const DATABASE_NAME = 'gestion-stock-db';
const OBJECT_STORE_NAME = 'articles';

@Injectable({
  providedIn: 'root',
})
export class IdbArticleService {
  documents$ = new BehaviorSubject<Article[]>([]);

  db$ = new ReplaySubject<IDBDatabase>(1);
  constructor() {
    this.init();
  }

  httpError(err: unknown) {
    console.log('err: ', err);
    alert('unexpected error...');
  }

  init() {
    const request = indexedDB.open(DATABASE_NAME, 1);
    request.onerror = (errorEvent) => {
      console.error('errorEvent: ', errorEvent);
    };
    request.onupgradeneeded = (onupgradeEvent) => {
      const db = (onupgradeEvent.target as IDBOpenDBRequest).result;
      console.log('create the database object store');
      // Create an objectStore for this database
      db.createObjectStore('articles', {
        keyPath: 'id',
      });
    };
    request.onsuccess = (successEvent) => {
      console.log('successEvent: ', successEvent);
      const db = (successEvent.target as IDBOpenDBRequest).result;
      this.db$.next(db);
    };
  }

  add(document: Article): Observable<void> {
    return timer(300).pipe(map(() => {}));
  }

  remove(selectedDocuments: Set<Article>): Observable<void> {
    const ids = [...selectedDocuments].map((a) => a.id);

    return timer(300).pipe(map(() => {}));
  }

  retrieveAll(): Observable<void> {
    const subject = new Subject<void>();
    (async () => {
      const db = await firstValueFrom(this.db$);
      console.log('db: ', db);

      const transaction = db.transaction([OBJECT_STORE_NAME], 'readonly');
      const objectStore = transaction.objectStore(OBJECT_STORE_NAME);
      const request = objectStore.getAll() as IDBRequest<Article[]>;
      request.onerror = (errorEvent) => {
        console.error('getAll errorEvent: ', errorEvent);
        subject.error(errorEvent);
      };
      request.onsuccess = (successEvent) => {
        console.log('getAll successEvent: ', successEvent);
        const articles = request.result;
        this.documents$.next(articles);
        subject.next();
        subject.complete();
      };
    })();

    return subject;
  }
}
