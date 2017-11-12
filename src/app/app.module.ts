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
import { AuthGuard } from './guards/auth.guard';
import { LayoutService } from 'app/shared-module/services/layout.service';
import { AuthCanLoadGuard } from 'app/guards/auth-can-load.guard';
import { FormCanDeactivateGuard } from 'app/guards/form-can-deactivate.guard';
import { ModalModule } from 'ngx-bootstrap';
import { ConfirmModalService } from 'app/core-module/confirm-modal/confirm-modal.service';
import { SharedModule } from 'app/shared-module/shared.module';

@NgModule({
  declarations: [
    AppComponent,
    ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    LoginModule,
    CoreModule,
    AppRoutingModule,
    ModalModule.forRoot(),
    SharedModule
  ],
  providers: [
    CarsService, 
    AuthService, 
    AuthGuard,
    AuthCanLoadGuard,
    FormCanDeactivateGuard,
    LayoutService,
    ConfirmModalService,
  ],
  entryComponents: [
  
  ],
  bootstrap: [AppComponent]
})

export class AppModule {}

