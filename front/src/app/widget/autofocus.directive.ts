import { Directive, ElementRef, OnDestroy, OnInit } from '@angular/core';

@Directive({
  selector: '[appAutofocus]',
})
export class AutofocusDirective implements OnInit, OnDestroy {
  constructor(private elt: ElementRef<HTMLElement>) {
    console.log('directive autofocus instantiated.', elt);
  }

  ngOnInit(): void {
    this.elt.nativeElement.focus();
  }

  ngOnDestroy(): void {
    console.log('destroy autofocus directive');
  }
}
