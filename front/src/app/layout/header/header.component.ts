import { Oauth2Service } from './../../services/oauth2.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor(public oauth2Service: Oauth2Service) {}

  ngOnInit(): void {}
}
