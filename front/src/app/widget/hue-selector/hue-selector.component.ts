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
  disabled = false;
  gradient = this.initGradiant();

  privatePosition: DraggablePosition = { x: 0.1, y: 0 };
  @HostBinding('attr.tabindex') tabindex = '0';

  constructor(private elt: ElementRef<HTMLElement>) {}

  @HostListener('keydown', ['$event'])
  keyEvent(event: KeyboardEvent) {
    console.log('event: ', event);
    const hue = Math.round(360 * this.privatePosition.x);
    switch (event.code) {
      case 'ArrowLeft':
        console.log('decrease hue');
        if (hue > 0) {
          this.writeValue(hue - 1);
        }

        break;
      case 'ArrowRight':
        console.log('increase hue', hue);
        if (hue < 360) {
          this.writeValue(hue + 1);
        }
        break;
      default:
    }
  }

  get position() {
    return this.privatePosition;
  }

  set position(val: DraggablePosition) {
    this.privatePosition = val;
    const hue = Math.floor(360 * this.privatePosition.x);
    this.onChange(hue);
    // this.onTouched(hue);
  }

  initGradiant() {
    const sampleNbr = 20;
    const colors = new Array(sampleNbr + 1)
      .fill(0)
      .map((n, i) => `hsl(${(i * 360) / sampleNbr}, 100%, 50%)`);
    const colorStr = colors.join(',');
    const result = `background: linear-gradient(90deg, ${colorStr});`;
    return result;
  }

  @HostListener('focusout')
  onBlur() {
    this.onTouched();
  }

  onChange: any = () => {};

  @HostListener('mouseup', ['$event'])
  onClick(evt: PointerEvent) {
    evt.preventDefault();
    this.elt.nativeElement.focus();
    const target = evt.target;
    const divCursor = this.elt.nativeElement.querySelector(
      'div.cursor'
    ) as HTMLElement;
    if (target !== divCursor) {
      return;
    }
    const rect = divCursor.getBoundingClientRect() as DOMRect;
    const pos = { x: evt.pageX, y: evt.pageY };
    const newPosition = { x: (pos.x - rect.left) / rect.width, y: 0 };
    this.position = newPosition;
  }

  onTouched: any = () => {};

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

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  writeValue(obj: number): void {
    this.position = { x: obj / 360, y: 0 };
  }
}
