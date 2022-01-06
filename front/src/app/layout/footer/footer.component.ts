import { Component } from '@angular/core';
import build from 'src/build';
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent {
  hash = build.git.hash;
}
