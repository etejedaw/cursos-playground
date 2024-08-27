import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'toggleCase',
})
export class ToggleCasePipe implements PipeTransform {
  transform(value: string, toUpper = true): string {
    if (toUpper) return value.toUpperCase();
    return value.toLowerCase();
  }
}
