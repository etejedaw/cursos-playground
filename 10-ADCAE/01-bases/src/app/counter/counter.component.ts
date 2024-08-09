import { Component } from '@angular/core';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
})
export class CounterComponent {
  counter = 0;

  increaseBy(value: number) {
    this.counter += value;
  }

  reset(num: number = 0) {
    this.counter = num;
  }
}
