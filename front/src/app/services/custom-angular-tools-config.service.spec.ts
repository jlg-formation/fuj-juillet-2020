import { TestBed } from '@angular/core/testing';

import { CustomAngularToolsConfigService } from './custom-angular-tools-config.service';

describe('CustomAngularToolsConfigService', () => {
  let service: CustomAngularToolsConfigService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomAngularToolsConfigService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
