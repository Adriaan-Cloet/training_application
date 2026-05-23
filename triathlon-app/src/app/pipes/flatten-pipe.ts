import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'flatten',
  standalone: true,
})
export class FlattenPipe implements PipeTransform {
  transform(value: (number | null)[][]): (number | null)[] {
    return value.flat();
  }
}
