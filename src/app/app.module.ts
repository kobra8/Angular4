import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { CarsListComponent, CarsService } from "./cars";
import { CoreModule } from "./core-module/core.module";
import { RouterModule } from "@angular/router";
import { AppRoutingModule } from "./app-routing.module";
import { LoginModule } from './login/login.module';
import { AuthService } from './auth/auth.service';
import { AuthGuard } from './auth/auth.guard';
import { LayoutService } from 'app/shared-module/services/layout.service';
import { AuthCanLoadGuard } from 'app/auth/auth-can-load.guard';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    LoginModule,
    CoreModule,
    AppRoutingModule
  ],
  providers: [
    CarsService, 
    AuthService, 
    AuthGuard,
    AuthCanLoadGuard,
    LayoutService
  ],
  bootstrap: [AppComponent]
})

export class AppModule {}

