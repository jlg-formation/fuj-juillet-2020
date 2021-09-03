import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AutofocusDirective } from './autofocus.directive';
import { UserStatusComponent } from './user-status/user-status.component';
import { DetailComponent } from './detail/detail.component';

@NgModule({
  declarations: [AutofocusDirective, UserStatusComponent, DetailComponent],
  imports: [CommonModule, RouterModule],
  exports: [AutofocusDirective, UserStatusComponent, DetailComponent],
})
export class WidgetModule {}
