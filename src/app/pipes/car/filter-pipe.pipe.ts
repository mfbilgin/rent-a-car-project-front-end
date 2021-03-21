import { Pipe, PipeTransform } from '@angular/core';
import { CarDetails } from '../../models/car/carDetails';

@Pipe({
  name: 'filterPipe',
})
export class FilterPipePipe implements PipeTransform {
  transform(value: CarDetails[], filterText: string): CarDetails[] {
    filterText = filterText ? filterText.toLocaleLowerCase() : '';
    return filterText
      ? value.filter(
          (car: CarDetails) =>
            car.description.toLocaleLowerCase().indexOf(filterText) !== -1
        )
      : value;
  }
}
