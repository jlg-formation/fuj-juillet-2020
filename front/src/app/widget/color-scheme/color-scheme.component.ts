import { Component } from '@angular/core';
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';
import { ColorSchemeService } from '@jlguenego/angular-tools';

@Component({
  selector: 'app-color-scheme',
  templateUrl: './color-scheme.component.html',
  styleUrls: ['./color-scheme.component.scss'],
})
export class ColorSchemeComponent {
  faSun = faSun;
  faMoon = faMoon;
  constructor(public colorSchemeService: ColorSchemeService) {}
}
