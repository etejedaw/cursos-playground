import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Subject, Subscription, debounceTime } from 'rxjs';

@Component({
  selector: 'shared-search-box',
  templateUrl: 'search-box.component.html',
  styleUrl: './search-box.component.css',
})
export class SearchBoxComponent implements OnInit, OnDestroy {
  private debouncer = new Subject<string>();
  private debouncerSuscription?: Subscription;

  ngOnInit() {
    this.debouncerSuscription = this.debouncer
      .pipe(debounceTime(300))
      .subscribe((value) => this.onDebounce.emit(value));
  }

  ngOnDestroy() {
    this.debouncerSuscription?.unsubscribe();
  }

  @Input()
  placeholder = '';

  @Input()
  initialValue = '';

  @Output()
  onValue = new EventEmitter<string>();

  @Output()
  onDebounce = new EventEmitter<string>();

  emitValue(value: string) {
    if (!value) return;
    this.onValue.emit(value);
  }

  onKeyPress(searchTerm: string) {
    if (!searchTerm) return;
    this.debouncer.next(searchTerm);
  }
}
