import { Component, forwardRef } from '@angular/core';
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

  constructor() {}

  initGradiant() {
    const sampleNbr = 20;
    const colors = new Array(sampleNbr + 1)
      .fill(0)
      .map((n, i) => `hsl(${(i * 360) / sampleNbr}, 100%, 50%)`);
    console.log('colors: ', colors);
    const colorStr = colors.join(',');
    console.log('colorStr: ', colorStr);
    const result = `background: linear-gradient(90deg, ${colorStr});`;
    console.log('result: ', result);
    return result;
  }

  registerOnChange(fn: any): void {
    console.log('registerOnChange fn: ', fn);
    this.onChange = (...args: any[]) => {
      console.log('running onchange', args);

      return fn(...args);
    };
  }

  registerOnTouched(fn: any): void {
    console.log('registerOnTouched fn: ', fn);
    this.onTouched = (...args: any[]) => {
      console.log('running ontouched', args);

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
