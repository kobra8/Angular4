import { Component, OnInit, AfterViewInit, ViewEncapsulation, ViewChild, ViewChildren, QueryList, Input } from '@angular/core';
import { Car } from "../models/car";
import { TotalCostComponent } from "../total-cost/total-cost.component";
import { CarsService } from "../cars.service";
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators, FormArray } from "@angular/forms";
import { CostSharedService } from 'app/cars/cost-shared.service';
import { CarTableRowComponent } from '../car-table-row/car-table-row.component';
import { CsValidators } from '../../shared-module/validators/cs-validators';
import { CanComponentDeactivate } from 'app/guards/form-can-deactivate.guard';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { ConfirmModalComponent } from 'app/core-module/confirm-modal/confirm-modal.component'
import { ConfirmModalService } from 'app/core-module/confirm-modal/confirm-modal.service';

@Component({
  selector: 'cs-cars-list',
  templateUrl: './cars-list.component.html',
  styleUrls: ['./cars-list.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class CarsListComponent implements OnInit, AfterViewInit, CanComponentDeactivate {
  @ViewChild("totalCostRef") totalCostRef: TotalCostComponent;
  //View child daje dostęp do jednego komponentu zagnieżdżonego
  @ViewChildren(CarTableRowComponent) carRows: QueryList<CarTableRowComponent>;
  // View children daje dostęp do listy komponentów zagnieżdżonych -> QueryList zawiera metody obsługi listy komponentów
  totalCost: number;
  grossCost: number;
  cars: Car[] = [];
  carForm: FormGroup;
  public bsModalRef: BsModalRef;
  private confirmAnswer: boolean;

  constructor(private carsService: CarsService,
    private formBuilder: FormBuilder,
    private costSharedService: CostSharedService,
    private router: Router,
    private modalService: BsModalService,
    private confirmModalService: ConfirmModalService
  ) {
  
   }

  ngOnInit() {
    this.loadCars();
    this.carForm = this.buildCarForm();
  }

  ngAfterViewInit() {
    this.carRows.changes.subscribe(() => {
      if (this.carRows.first.car.clientSurname === 'Kowalski') {
        console.log('Warning, Client Kowalski is next!!')
      }
    })
  }

  buildCarForm() {
    return this.formBuilder.group({
      model: ['', Validators.required],
      type: '',
      plate: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(7)]],
      deliveryDate: '',
      deadline: '',
      color: '',
      power: ['', CsValidators.power],
      clientFirstName: '',
      clientSurname: '',
      isFullyDamaged: '',
      year: '',
      parts: this.formBuilder.array([])
    });
  }

  buildParts(): FormGroup {
    return this.formBuilder.group({
      name: '',
      inStock: true,
      price: ''
    });
  }

  //Słowo get sprawia, ze metodę parts używamy potem bez nawiasów -> this.parts.push(coś)
  get parts(): FormArray {
    return <FormArray>this.carForm.get('parts');
  }

  addPart(): void {
    this.parts.push(this.buildParts())
  }

  removePart(i): void {
    this.parts.removeAt(i);
  }

  togglePlateValidity() {
    const damageControl = this.carForm.get('isFullyDamaged');
    const plateControl = this.carForm.get('plate');

    if (damageControl.value) {
      plateControl.clearValidators();
    }
    else {
      plateControl.setValidators([Validators.required, Validators.minLength(3), Validators.maxLength(7)])
    }
    plateControl.updateValueAndValidity();
  }

  loadCars(): void {
    this.carsService.getCars().subscribe((cars) => {
      this.cars = cars;
      this.countTotalCost();
      this.costSharedService.shareCost(this.totalCost);
    });
  }

  addCar() {
    // Poniższy kod zwraca obiekt formularza bez referencji i potem przypisuje wynik getPartCost() do cost
    let carFormData = Object.assign({}, this.carForm.value);
    carFormData.cost = this.getPartsCost(carFormData.parts);

    this.carsService.addCar(carFormData).subscribe(() => {
      this.loadCars();
    });
  }

  getPartsCost(parts) {
    return parts.reduce((prev, nextPart) => {
      return parseFloat(prev) + parseFloat((nextPart.price))
    }, 0)
  }

  goToCarDetails(car: Car) {
    this.router.navigate(['/cars', car.id]);
  }

  onRemovedCar(car: Car) {
    this.carsService.removeCar(car.id).subscribe(() => {
      this.loadCars();
    });
  }

  showGross(): void {
    this.totalCostRef.showGross();
  }

  countTotalCost(): void {
    if (this.cars.length === 0) {
      return;
    }

    this.totalCost = this.cars
      .map((car) => car.cost)
      .reduce((prev, next) => prev + next);
  }

  onShownGross(grossCost: number): void {
    this.grossCost = grossCost;
  }

  //Guard sprawdzający czy formularz nie został opuszczony przed zapisaniem
 
  canDeactivate() {
    if (!this.carForm.dirty) {
      return true;
    }
    this.confirmModalService.confirmSource$.subscribe(x => {
      this.confirmAnswer = x;
      console.log(this.confirmAnswer);
    })
    this.openModal()
    console.log("openModal" + this.confirmAnswer)
    return this.confirmAnswer
    //return window.confirm('Discard Changes?');
  }
  private openModal(): void {
    this.bsModalRef = this.modalService.show(ConfirmModalComponent)
  }

  private confirmModal() {
    this.confirmModalService.confirmSource$.subscribe(x => {
      this.confirmAnswer = x;
    })
    console.log("confirmmethod" + this.confirmAnswer)
  }
}
