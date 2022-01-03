import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CacheStorageComponent } from './cache-storage.component';

describe('CacheStorageComponent', () => {
  let component: CacheStorageComponent;
  let fixture: ComponentFixture<CacheStorageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CacheStorageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CacheStorageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
