import { FormControl, FormGroup, ValidationErrors } from '@angular/forms';
import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'app-field-error',
  templateUrl: './field-error.component.html',
  styleUrls: ['./field-error.component.scss'],
})
export class FieldErrorComponent implements OnInit, OnChanges {
  @Input() errors!: ValidationErrors | null;
  @Input() name!: string;

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    console.log('changes: ', changes);
  }

  ngOnInit(): void {}
}
