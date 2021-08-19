import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.scss'],
})
export class StockComponent implements OnInit {
  articles = [
    { name: 'Tournevis', price: 2.34, qty: 123 },
    { name: 'Marteau', price: 11, qty: 4567 },
    { name: 'Tondeuse à gazon', price: 234, qty: 3 },
    { name: 'Pelle', price: 1.23, qty: 5 },
  ];

  constructor() {}

  ngOnInit(): void {}
}
