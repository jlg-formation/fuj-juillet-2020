import { TestBed } from '@angular/core/testing';

import { ArticleValidatorService } from './article-validator.service';

describe('ArticleValidatorService', () => {
  let service: ArticleValidatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ArticleValidatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
