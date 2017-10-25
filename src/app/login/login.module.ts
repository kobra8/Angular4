import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { FormsModule } from '@angular/forms';
import { LogingRoutingModule } from 'app/login/login-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    LogingRoutingModule
  ],
  declarations: [LoginComponent]
})
export class LoginModule { }
