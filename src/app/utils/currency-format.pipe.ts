import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'currencyFormat',
  standalone: true
})
export class CurrencyFormatPipe implements PipeTransform {

  transform(value: number, ...args: unknown[]): string {
    if (value != null) {
      return value.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
      });
    }
    return 'R$ 0,00';
  }

}
