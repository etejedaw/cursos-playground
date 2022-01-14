import { Component, EventEmitter, Input, Output} from '@angular/core';
import Personaje from '../interfaces/dbz.interface';
import { DbzService } from '../services/dbz.service';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styleUrls: ['./agregar.component.css']
})
export class AgregarComponent {

  @Input()
  nuevo: Personaje = {
    nombre: '',
    poder: 0
  } 
  
  constructor(private dbzService: DbzService){}

  agregar(){
    this.dbzService.agregarPersonaje(this.nuevo);
  }

}
