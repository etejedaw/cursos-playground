import { Component } from '@angular/core';
import { interval } from 'rxjs';

@Component({
  selector: 'app-no-comunes',
  templateUrl: './no-comunes.component.html',
  styleUrls: ['./no-comunes.component.css'],
})
export class NoComunesComponent {
  persona1 = {
    nombre: 'Esteban',
    genero: 'masculino',
  };
  persona2 = {
    nombre: 'Pricila',
    genero: 'femenino',
  };
  invitacionMap = {
    masculino: 'invitarlo',
    femenino: 'invitarla',
  };
  cambiarPersona() {
    this.persona1 = this.persona2;
  }

  clientes = ['Esteban', 'Nicolás', 'Pricila', 'Tamara'];
  clientesMap = {
    '=0': 'no tenemos ningún cliente',
    '=1': 'tenemos un cliente',
    other: 'tenemos # clientes',
  };
  borrarCliente() {
    this.clientes.pop();
  }

  persona = {
    nombre: 'Pricila',
    edad: '27',
    pais: 'Chile',
  };

  miObservable = interval(1000);

  miPromesa = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('Fin de la promesa');
    }, 3500);
  });
}
