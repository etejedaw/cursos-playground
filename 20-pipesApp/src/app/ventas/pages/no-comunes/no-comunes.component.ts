import { Component } from '@angular/core';
import { interval } from 'rxjs';

@Component({
  selector: 'app-no-comunes',
  templateUrl: './no-comunes.component.html',
  styleUrls: ['./no-comunes.component.css']
})
export class NoComunesComponent {

  nombre = "Pricila";
  genero = "femenino";
  invitacionMap = {
    "masculino": "invitarlo",
    "femenino": "invitarla"
  }

  clientes = ["Prici", "Tamara", "Nicolás"];
  clientesMap = {
    "=0": "no tenemos ningún cliente esperando",
    "=1": "tenemos un cliente esperando",
    "other": "tenemos # esperando"
  }

  cambiarCliente(){
    this.nombre = "Nicolás";
    this.genero = "masculino";
  }

  borrarCliente(){
    this.clientes.pop();
  }

  persona = {
    nombre: "Pricila",
    edad: 26,
    país: "Chile"
  }

  heroes = [
    {
      nombre: "Superman",
      vuela: true
    },
    {
      nombre: "Robin",
      vuela: false
    },
    {
      nombre: "Aquaman",
      vuela: false
    }
  ]

  miObservable = interval(1000);

  valorPromesa = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("Tenemos data de promesa");
    }, 3500);
  });

}
