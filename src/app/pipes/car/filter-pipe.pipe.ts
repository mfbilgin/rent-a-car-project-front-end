import { Pipe, PipeTransform } from '@angular/core';
import { CarDetail } from '../../models/car/carDetails';

@Pipe({
  name: 'filterPipe',
})
export class FilterPipePipe implements PipeTransform {
  transform(value: CarDetail[], filterText: string): CarDetail[] {
    filterText = filterText ? filterText.toLocaleLowerCase() : '';
    return filterText
      ? value.filter(
          (car: CarDetail) =>
            car.description.toLocaleLowerCase().indexOf(filterText) !== -1
        )
      : value;
  }
}
