import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Personaje } from '../interfaces/dbz.interface';
import { DbzService } from '../services/dbz.service';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styleUrls: ['./agregar.component.css'],
})
export class AgregarComponent {
  @Input()
  nuevo = {
    nombre: '',
    poder: 0,
  } as Personaje;

  constructor(private _dbzService: DbzService) {}

  agregar() {
    if (this.nuevo.nombre.trim().length === 0) return;
    this._dbzService.agregarPersonaje(this.nuevo);
    this.nuevo = {
      nombre: '',
      poder: 0,
    } as Personaje;
  }
}
