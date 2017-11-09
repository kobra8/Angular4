import {NgModule} from "@angular/core";
import {RouterModule, Route} from "@angular/router";
import {CarDetailsComponent} from "./car-details/car-details.component";
import {CarResolve} from "./car-resolve.service";
import { AuthGuard } from "app/guards/auth.guard";
import { CarsComponent } from "app/cars/cars.component";
import { CarsListComponent } from "./cars-list/cars-list.component";
import { FormCanDeactivateGuard } from "app/guards/form-can-deactivate.guard";

const CARS_ROUTES : Route[] = [
  {
    path: '',
    component: <any>CarsComponent,
    children: [
      {
        path: '',
        component: <any>CarsListComponent,
        canDeactivate: [FormCanDeactivateGuard]
      },
      {
        path: ':id',
        component: <any>CarDetailsComponent,
        resolve: { car: CarResolve }
      }
    ]
  },
 
];

@NgModule({
  imports: [
    RouterModule.forChild(CARS_ROUTES)
  ],
  exports: [
    RouterModule
  ]
})

export class CarsRoutingModule {
}
