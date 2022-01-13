import { Component, EventEmitter, Input, Output} from '@angular/core';
import Personaje from '../interfaces/dbz.interface';

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

  @Output()
  onNuevoPersonaje: EventEmitter<Personaje> = new EventEmitter();
  
  agregar(){
    this.onNuevoPersonaje.emit(this.nuevo);
  }

}
