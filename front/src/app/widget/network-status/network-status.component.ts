import { HttpClient } from '@angular/common/http';
import { lastValueFrom, timer } from 'rxjs';
import { Component } from '@angular/core';
import { faLink, faSync, faUnlink } from '@fortawesome/free-solid-svg-icons';
import { NetworkService } from '@jlguenego/angular-tools';

@Component({
  selector: 'app-network-status',
  templateUrl: './network-status.component.html',
  styleUrls: ['./network-status.component.scss'],
})
export class NetworkStatusComponent {
  faLink = faLink;
  faUnlink = faUnlink;
  faSync = faSync;
  isOnline = false;
  isLoading = true;

  constructor(
    private networkService: NetworkService,
    private http: HttpClient
  ) {
    this.networkService.status$.subscribe((status) => {
      this.isOnline = status === 'online';
      this.isLoading = false;
    });
  }

  ping() {
    (async () => {
      try {
        this.isLoading = true;
        await lastValueFrom(timer(300));
        await lastValueFrom(this.http.get('/ping-url'));
      } catch (err) {
      } finally {
        this.isLoading = false;
      }
    })();
  }
}
