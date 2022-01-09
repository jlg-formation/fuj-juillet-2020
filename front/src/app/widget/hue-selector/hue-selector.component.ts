import {
  Component,
  ElementRef,
  forwardRef,
  HostBinding,
  HostListener,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { DraggablePosition } from '../draggable.directive';

@Component({
  selector: 'app-hue-selector',
  templateUrl: './hue-selector.component.html',
  styleUrls: ['./hue-selector.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => HueSelectorComponent),
      multi: true,
    },
  ],
})
export class HueSelectorComponent implements ControlValueAccessor {
  onChange: any = () => {};
  onTouched: any = () => {};
  disabled = false;

  @HostBinding('attr.tabindex') tabindex = '0';

  @HostListener('focusout', ['$event'])
  onBlur(evt: any) {
    this.onTouched();
  }

  @HostListener('click', ['$event'])
  onClick(evt: any) {
    console.log('onclick evt: ', evt);
    console.log('this.elt.nativeElement: ', this.elt.nativeElement);
    // setTimeout(() => {
    this.elt.nativeElement.focus();
    const activeElt = document.activeElement;
    console.log('activeElt: ', activeElt);

    // }, 100);
  }

  gradient = this.initGradiant();
  privatePosition: DraggablePosition = { x: 0.1, y: 0 };
  set position(val: DraggablePosition) {
    console.log('val: ', val);
    this.privatePosition = val;
    const hue = Math.floor(360 * this.privatePosition.x);
    this.onChange(hue);
    // this.onTouched(hue);
  }
  get position() {
    return this.privatePosition;
  }

  constructor(private elt: ElementRef<HTMLElement>) {}

  initGradiant() {
    const sampleNbr = 20;
    const colors = new Array(sampleNbr + 1)
      .fill(0)
      .map((n, i) => `hsl(${(i * 360) / sampleNbr}, 100%, 50%)`);
    const colorStr = colors.join(',');
    const result = `background: linear-gradient(90deg, ${colorStr});`;
    return result;
  }

  registerOnChange(fn: any): void {
    this.onChange = (...args: any[]) => {
      return fn(...args);
    };
  }

  registerOnTouched(fn: any): void {
    this.onTouched = (...args: any[]) => {
      return fn(...args);
    };
  }

  writeValue(obj: number): void {
    console.log('writeValue obj: ', obj);
    this.position = { x: obj / 360, y: 0 };
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}
