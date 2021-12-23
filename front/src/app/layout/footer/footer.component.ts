import { Component } from '@angular/core';
import { OfflineService } from '@jlguenego/angular-tools';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent {
  constructor(public offlineService: OfflineService) {}
}
