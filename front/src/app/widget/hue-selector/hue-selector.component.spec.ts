import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HueSelectorComponent } from './hue-selector.component';

describe('HueSelectorComponent', () => {
  let component: HueSelectorComponent;
  let fixture: ComponentFixture<HueSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HueSelectorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HueSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
