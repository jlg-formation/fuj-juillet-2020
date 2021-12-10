import { Component } from '@angular/core';
import { JlgService } from 'jlg';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(private jlgService: JlgService) {}
}
