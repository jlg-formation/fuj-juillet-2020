import { TestBed } from '@angular/core/testing';

import { IdbArticleService } from './idb-article.service';

describe('IdbArticleService', () => {
  let service: IdbArticleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IdbArticleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
