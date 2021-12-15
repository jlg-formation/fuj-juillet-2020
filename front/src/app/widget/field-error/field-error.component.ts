import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormGroup, ValidationErrors } from '@angular/forms';
import { interval, merge, take } from 'rxjs';

@Component({
  selector: 'app-field-error',
  templateUrl: './field-error.component.html',
  styleUrls: ['./field-error.component.scss'],
})
export class FieldErrorComponent {
  @Input() fg!: FormGroup;
  @Input() name!: string;

  get fc(): AbstractControl {
    return this.fg.controls[this.name];
  }
  get errors(): ValidationErrors | null {
    return this.fc.errors;
  }

  constructor() {}
}
