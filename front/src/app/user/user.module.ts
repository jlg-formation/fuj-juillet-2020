import { ReactiveFormsModule } from '@angular/forms';
import { WidgetModule } from './../widget/widget.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [UserComponent, LoginComponent],
  imports: [CommonModule, UserRoutingModule, WidgetModule, ReactiveFormsModule],
})
export class UserModule {}
