import { Component, OnInit, ViewChild, ViewContainerRef, ComponentFactoryResolver, ComponentRef, Type } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { CarsService } from "../cars.service";
import { Car } from "../models/car";
import { FormBuilder, FormGroup, Validators, FormArray } from "@angular/forms";
import { DateInfoComponent } from './date-info/date-info.component';

@Component({
  selector: 'cs-car-details',
  templateUrl: './car-details.component.html',
  styleUrls: ['./car-details.component.less']
})
export class CarDetailsComponent implements OnInit {
  @ViewChild('dateInfoContainer', {read: ViewContainerRef}) dateInfoContainer: ViewContainerRef
  // Powyżej do view child dodajemy opcję: read, która zmienia zwracany typ na ViewContainerRef zamiast domyślnego zwracanego przez ViewChild 'ElementRef'
  car: Car;
  carForm: FormGroup;
  elapsedDays: number;
  dateInfoRef;

  constructor(
    private carsService: CarsService,
    private formBuilder: FormBuilder,
    private componentFactoryResolver: ComponentFactoryResolver,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.loadCar();
    this.carForm = this.buildCarForm();
  }

  createDateInfoComponent() {
    console.log(this.componentFactoryResolver)
    if(this.dateInfoContainer.get(0) !== null) {
      return;
    }
    const dateInfofactory = this.componentFactoryResolver.resolveComponentFactory(<Type<DateInfoComponent>>DateInfoComponent);
    this.dateInfoRef = <ComponentRef<DateInfoComponent>>this.dateInfoContainer.createComponent(dateInfofactory);
    //Przekazanie danych do dynamicznego komponentu poprzez parametr instance
    this.dateInfoRef.instance.car = this.car;
    this.dateInfoRef.instance.checkElapsedDays.subscribe((x) => {
      this.elapsedDays = x
    })
  }

  clearDateInfoContainer() {
   // this.dateInfoContainer.clear(); // Tu czyścimy kontener
   // this.dateInfoContainer.remove(0); // Tu usuwamy komponent na konkretnym indeksie kontenera
    this.dateInfoRef.destroy(); // Tu usuwamy konkretny dynamiczny komponent
  }

  buildCarForm() {
    let parts = this.car.parts.map(part => this.formBuilder.group(part));
    return this.formBuilder.group({
      model: [this.car.model, Validators.required],
      type: this.car.type,
      plate: [this.car.plate, [Validators.required, Validators.minLength(3), Validators.maxLength(8)]],
      deliveryDate: this.car.deliveryDate,
      deadline: this.car.deadline,
      color: this.car.color,
      power: this.car.power,
      clientFirstName: this.car.clientFirstName,
      clientSurname: this.car.clientSurname,
      isFullyDamaged: this.car.isFullyDamaged,
      year: this.car.year,
      parts: this.formBuilder.array(parts)
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
  loadCar() {
    this.car = this.route.snapshot.data['car']
  }

  updateCar() {
    let carFormData = Object.assign({}, this.carForm.value);
    carFormData.cost = this.getPartsCost(carFormData.parts);

    this.carsService.updateCar(this.car.id, carFormData).subscribe(() => {
      this.router.navigate(['/cars']);
    });
  }
  getPartsCost(parts) {
    return parts.reduce((prev, nextPart) => {
      return parseFloat(prev) + parseFloat((nextPart.price))
    }, 0)
  }
}
