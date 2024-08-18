import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'shared-search-box',
  templateUrl: 'search-box.component.html',
  styleUrl: './search-box.component.css',
})
export class SearchBoxComponent {
  @Input()
  placeholder = '';

  @Output()
  onValue = new EventEmitter<string>();

  emitValue(value: string) {
    if (!value) return;
    this.onValue.emit(value);
  }
}
