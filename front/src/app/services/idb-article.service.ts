import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  firstValueFrom,
  lastValueFrom,
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
        autoIncrement: true,
      });
    };
    request.onsuccess = (successEvent) => {
      console.log('successEvent: ', successEvent);
      const db = (successEvent.target as IDBOpenDBRequest).result;
      this.db$.next(db);
    };
  }

  add(document: Article): Observable<void> {
    const subject = new Subject<void>();
    (async () => {
      await lastValueFrom(timer(300));
      const db = await firstValueFrom(this.db$);
      console.log('db: ', db);

      const transaction = db.transaction([OBJECT_STORE_NAME], 'readwrite');
      const objectStore = transaction.objectStore(OBJECT_STORE_NAME);
      const request = objectStore.add(document);
      request.onerror = (errorEvent) => {
        console.error('add errorEvent: ', errorEvent);
        subject.error(errorEvent);
      };
      request.onsuccess = (successEvent) => {
        console.log('add successEvent: ', successEvent);
        const articles = request.result;
        subject.next();
        subject.complete();
      };
    })();

    return subject;
  }

  remove(selectedDocuments: Set<Article>): Observable<void> {
    const subject = new Subject<void>();
    (async () => {
      try {
        await lastValueFrom(timer(300));
        const db = await firstValueFrom(this.db$);
        console.log('db: ', db);

        const transaction = db.transaction([OBJECT_STORE_NAME], 'readwrite');
        const objectStore = transaction.objectStore(OBJECT_STORE_NAME);

        const removeOne = (id: string) => {
          return new Promise<void>((resolve, reject) => {
            const request = objectStore.delete(id);
            request.onerror = (errorEvent) => {
              console.error('add errorEvent: ', errorEvent);
              reject(errorEvent);
            };
            request.onsuccess = (successEvent) => {
              console.log('remove successEvent: ', successEvent);
              resolve();
            };
          });
        };

        for (const id of [...selectedDocuments].map((d) => d.id)) {
          await removeOne(id);
        }
      } catch (err) {
        subject.error(err);
      }
      subject.next();
      subject.complete();
    })();

    return subject;
  }

  retrieveAll(): Observable<void> {
    const subject = new Subject<void>();
    (async () => {
      await lastValueFrom(timer(300));
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
