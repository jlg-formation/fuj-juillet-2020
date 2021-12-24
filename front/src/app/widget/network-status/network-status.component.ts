import { Component } from '@angular/core';
import { faLink, faUnlink } from '@fortawesome/free-solid-svg-icons';
import { NetworkService } from '@jlguenego/angular-tools';

@Component({
  selector: 'app-network-status',
  templateUrl: './network-status.component.html',
  styleUrls: ['./network-status.component.scss'],
})
export class NetworkStatusComponent {
  faLink = faLink;
  faUnlink = faUnlink;
  isOnline = false;

  constructor(private networkService: NetworkService) {
    this.networkService.status$.subscribe((status) => {
      this.isOnline = status === 'online';
    });
  }
}
