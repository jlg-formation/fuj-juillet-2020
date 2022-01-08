import { Component } from '@angular/core';

@Component({
  selector: 'app-hue-selector',
  templateUrl: './hue-selector.component.html',
  styleUrls: ['./hue-selector.component.scss'],
})
export class HueSelectorComponent {
  gradient = this.initGradiant();
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
}
