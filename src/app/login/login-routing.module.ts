import {NgModule} from "@angular/core";
import {RouterModule, Route} from "@angular/router";
import { LoginComponent } from './login.component';


const CARS_ROUTES : Route[] = [
  {
    path: 'login',
    component: <any>LoginComponent,

  }
];

@NgModule({
  imports: [
    RouterModule.forChild(CARS_ROUTES)
  ],
  exports: [
    RouterModule
  ]
})

export class LogingRoutingModule {}
