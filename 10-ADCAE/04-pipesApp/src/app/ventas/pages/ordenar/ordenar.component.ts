import { Component } from '@angular/core';
import { Color, Heroe } from '../../interfaces/ventas.interface';

@Component({
  selector: 'app-ordenar',
  templateUrl: './ordenar.component.html',
  styleUrls: ['./ordenar.component.css'],
})
export class OrdenarComponent {
  enMayuscula = true;
  ordenarPor = '';
  heroes: Heroe[];

  constructor() {
    this.heroes = [
      {
        nombre: 'Superman',
        vuela: true,
        color: Color.azul,
      },
      {
        nombre: 'Batman',
        vuela: false,
        color: Color.negro,
      },
      {
        nombre: 'Robin',
        vuela: false,
        color: Color.verde,
      },
      {
        nombre: 'Daredevil',
        vuela: false,
        color: Color.rojo,
      },
      {
        nombre: 'Linterna Verde',
        vuela: true,
        color: Color.verde,
      },
    ];
  }

  cambiar() {
    this.enMayuscula = !this.enMayuscula;
  }

  cambiarOrden(valor: string) {
    this.ordenarPor = valor;
  }
}
