import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, ValidationErrors } from '@angular/forms';

@Component({
  selector: 'app-field-error',
  templateUrl: './field-error.component.html',
  styleUrls: ['./field-error.component.scss'],
})
export class FieldErrorComponent implements OnInit {
  @Input() fg!: FormGroup;
  @Input() name!: string;

  errors!: ValidationErrors | null;

  constructor() {}

  ngOnInit(): void {
    this.fg.valueChanges.subscribe(() => {
      this.errors = this.fg.controls[this.name].errors;
    });
  }
}
