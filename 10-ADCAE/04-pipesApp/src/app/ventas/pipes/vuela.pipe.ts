import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'vuela',
})
export class VuelaPipie implements PipeTransform {
  transform(value: boolean): string {
    return value ? 'vuela' : 'no vuela';
  }
}
