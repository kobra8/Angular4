import { Component, OnInit, OnDestroy } from '@angular/core';
import { CostSharedService } from 'app/cars/cost-shared.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'cs-income-tax',
  templateUrl: './income-tax.component.html'
})
export class IncomeTaxComponent implements OnInit, OnDestroy {
  private incomeTax: number = 18;
  income: number;
  costSubscription: Subscription; // Import metod subskrybcji z RX JS (Obiekt reprezentuje strumień danych) - przypisanie do zmiennej

  constructor(
    private costSharedService: CostSharedService
  ) { }

  
  ngOnInit() {
    this.costSubscription = this.costSharedService.totalCostSource$.subscribe((cost) => {
      this.income = cost * this.incomeTax / 100;
    })
  }
  // Subskrybcja została przypisana do obiektu strumienia danych i można teraz użyć do niej metody z RxJS np. unsubscribe()

  ngOnDestroy() {
    if(this.costSubscription) {
    this.costSubscription.unsubscribe();
    }
  }

}
