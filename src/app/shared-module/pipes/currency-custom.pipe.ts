import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'currencyCustom'
})
export class CurrencyCustomPipe implements PipeTransform {

  transform(value: string): string {
    if (!value) {
      return '';
    }
    return `${value} PLN`;
  }
}
