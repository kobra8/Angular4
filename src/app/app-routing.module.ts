import {NgModule} from "@angular/core";
import {RouterModule, Route} from "@angular/router";
import {CarsListComponent} from "./cars/cars-list/cars-list.component";
import { AuthGuard } from 'app/auth/auth.guard';

const APP_ROUTES : Route[] = [
  { path: '', pathMatch: 'full', redirectTo: 'cars', canActivate: [AuthGuard] },
  { path: 'cars', component: <any>CarsListComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [
    RouterModule.forRoot(APP_ROUTES)
  ],
  exports: [
    RouterModule
  ]
})

export class AppRoutingModule {}
