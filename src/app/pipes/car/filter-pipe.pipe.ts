import { Pipe, PipeTransform } from '@angular/core';
import { Car } from '../../models/car/car';

@Pipe({
  name: 'filterPipe',
})
export class FilterPipePipe implements PipeTransform {
  transform(value: Car[], filterText: string): Car[] {
    filterText = filterText ? filterText.toLocaleLowerCase() : '';
    return filterText
      ? value.filter(
          (car: Car) =>
            car.descript.toLocaleLowerCase().indexOf(filterText) !== -1
        )
      : value;
  }
}
