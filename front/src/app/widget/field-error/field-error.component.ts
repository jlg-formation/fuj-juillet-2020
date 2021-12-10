import { Component, Input, OnInit } from '@angular/core';
import {
  FormGroup,
  ValidationErrors,
  AbstractControl,
} from '@angular/forms';
import { interval, merge, take } from 'rxjs';

@Component({
  selector: 'app-field-error',
  templateUrl: './field-error.component.html',
  styleUrls: ['./field-error.component.scss'],
})
export class FieldErrorComponent implements OnInit {
  @Input() fg!: FormGroup;
  @Input() name!: string;

  fc!: AbstractControl;
  errors!: ValidationErrors | null;

  constructor() {}

  ngOnInit(): void {
    this.fc = this.fg.controls[this.name];
    merge(this.fg.statusChanges, interval(300).pipe(take(10))).subscribe(() => {
      this.errors = this.fg.controls[this.name].errors;
    });
  }
}
