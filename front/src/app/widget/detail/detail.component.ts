import {
  Component,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent implements OnChanges {
  entries$ = new BehaviorSubject<[string, string][]>([]);
  @Input() object: unknown;

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    console.log('changes: ', changes);
    if (!changes['object'].currentValue) {
      this.entries$.next([]);
      return;
    }
    const object = changes['object'].currentValue as { [key: string]: string };
    const entries = Object.entries(object);
    this.entries$.next(entries);
  }
}
