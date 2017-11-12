import {NgModule} from "@angular/core";
import {RouterModule, Route} from "@angular/router";
import {CarsListComponent} from "./cars/cars-list/cars-list.component";
import { AuthGuard } from 'app/guards/auth.guard';
import { AuthCanLoadGuard } from 'app/guards/auth-can-load.guard';
import { PageNotFoundComponent } from "app/shared-module/page-not-found/page-not-found.component";

const APP_ROUTES : Route[] = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  { path: 'cars', canLoad: [AuthCanLoadGuard], loadChildren: 'app/cars/cars.module#CarsModule' },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(APP_ROUTES, {enableTracing: true})
    //ustawienie enableTracing należy stosować tylko podczas testów -> usunąć w wersji produkcyjnej
  ],
  exports: [
    RouterModule
  ]
})

export class AppRoutingModule {}
