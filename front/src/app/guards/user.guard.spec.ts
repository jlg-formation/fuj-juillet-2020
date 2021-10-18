import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { UserGuard } from './user.guard';

describe('UserGuard', () => {
  let guard: UserGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
    });
    guard = TestBed.inject(UserGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
