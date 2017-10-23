import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Car } from 'app/cars/models/car';

@Component({
  selector: '[cs-car-table-row]',
  templateUrl: './car-table-row.component.html'
})
export class CarTableRowComponent {
  @Input() car: Car; //Odbieramy obiekt Car z komponentu nadrzędnego
  @Output() removedCar = new EventEmitter(); //Wysyłamy zdarzenie z click do rodzica

  removeCar(car, event) {
    event.stopPropagation(); // Zapobiegamy bąbelkowaniu eventu na <tr>
    this.removedCar.emit(car)
  }
}
