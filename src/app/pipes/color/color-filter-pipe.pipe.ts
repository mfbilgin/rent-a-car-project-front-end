import { Pipe, PipeTransform } from '@angular/core';
import { Color } from 'src/app/models/color/color';

@Pipe({
  name: 'colorFilterPipe',
})
export class ColorFilterPipePipe implements PipeTransform {
  transform(value: Color[], filterText: string): Color[] {
    filterText = filterText ? filterText.toLocaleLowerCase() : '';
    return filterText
      ? value.filter(
          (color: Color) =>
            color.colorName.toLocaleLowerCase().indexOf(filterText) !== -1
        )
      : value;
  }
}
