import { Component } from '@angular/core';
import build from 'src/build';

@Component({
  selector: 'app-legal',
  templateUrl: './legal.component.html',
  styleUrls: ['./legal.component.scss'],
})
export class LegalComponent {
  build = build;
  timestamp = new Date(build.timestamp)
    .toISOString()
    .slice(0, 20)
    .replace('T', ' ');
}
