import {
  Component, OnInit, Input, Output, EventEmitter, HostBinding,
  HostListener, ElementRef, Renderer2
} from '@angular/core';
import { Car } from 'app/cars/models/car';

@Component({
  selector: '[cs-car-table-row]',
  templateUrl: './car-table-row.component.html'
})
export class CarTableRowComponent implements OnInit {
  @Input() car: Car; //Odbieramy obiekt Car z komponentu nadrzędnego
  @Output() removedCar = new EventEmitter(); //Wysyłamy zdarzenie z click do rodzica
  @HostBinding('class.after-deadline') deadline: boolean = false;
  @HostListener('mouseenter') onMouseEnter() {
    this.setRemoveButtonStyle('red')
  }
  @HostListener('mouseleave') onMouseLeave() {
    this.setRemoveButtonStyle('black')
  }

  constructor(
    private el: ElementRef,
    private renderer: Renderer2
  ) { }

  ngOnInit() {
    this.deadline = new Date(this.car.deadline) < new Date();
  }

  removeCar(car, event) {
    event.stopPropagation(); // Zapobiegamy bąbelkowaniu eventu na <tr>
    this.removedCar.emit(car)
  }

  private setRemoveButtonStyle(colorVal) {
    this.renderer.setStyle(this.el.nativeElement.querySelector('.remove-btn'), 'color', colorVal)
  }
}
