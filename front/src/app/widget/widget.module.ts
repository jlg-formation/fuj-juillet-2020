import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserStatusComponent } from './user-status/user-status.component';
import { DetailComponent } from './detail/detail.component';
import { FieldErrorComponent } from './field-error/field-error.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ColorSchemeComponent } from './color-scheme/color-scheme.component';

@NgModule({
  declarations: [UserStatusComponent, DetailComponent, FieldErrorComponent, ColorSchemeComponent],
  imports: [CommonModule, RouterModule, FontAwesomeModule],
  exports: [UserStatusComponent, DetailComponent, FieldErrorComponent, ColorSchemeComponent],
})
export class WidgetModule {}
