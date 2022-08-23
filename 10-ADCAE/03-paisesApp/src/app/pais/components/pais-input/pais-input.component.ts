import { Component, EventEmitter, Output, OnInit, Input } from '@angular/core';
import { debounceTime, Subject } from 'rxjs';

@Component({
  selector: 'app-pais-input',
  templateUrl: './pais-input.component.html',
  styleUrls: ['./pais-input.component.css'],
})
export class PaisInputComponent implements OnInit {
  @Output()
  onEnter: EventEmitter<string>;

  @Output()
  onDebounce: EventEmitter<string>;

  @Input()
  placeholder: string;

  debouncer: Subject<string>;
  termino: string;

  constructor() {
    this.onEnter = new EventEmitter();
    this.onDebounce = new EventEmitter();
    this.placeholder = 'Buscar';
    this.debouncer = new Subject();
    this.termino = '';
  }

  ngOnInit() {
    this.debouncer
      .pipe(debounceTime(300))
      .subscribe((valor) => this.onDebounce.emit(valor));
  }

  buscar() {
    this.onEnter.emit(this.termino);
    this.debouncer;
  }

  teclaPresionada() {
    this.debouncer.next(this.termino);
  }
}
