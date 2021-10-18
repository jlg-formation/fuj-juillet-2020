import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { AutofocusDirective } from './autofocus.directive';

@Component({
  selector: 'app-test',
  template: `<div>
    <input type="text" name="truc" appAutofocus />
  </div> `,
})
class TestComponent {}

describe('AutofocusDirective', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AutofocusDirective, TestComponent],
    }).compileComponents();
  });

  it('should autofocus on html content', () => {
    const fixture = TestBed.createComponent(TestComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const inputElt = compiled.querySelector('input');
    const focusElt = document.activeElement as HTMLInputElement;
    expect(inputElt === focusElt).toBeTrue();

    // or
    expect(inputElt).toBe(focusElt);
  });
});
