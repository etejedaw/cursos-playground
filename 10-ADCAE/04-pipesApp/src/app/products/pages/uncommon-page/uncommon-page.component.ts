import { Component } from '@angular/core';
import { interval } from 'rxjs';

@Component({
  selector: 'app-uncommon-page',
  templateUrl: './uncommon-page.component.html',
  styleUrl: './uncommon-page.component.css',
})
export class UncommonPageComponent {
  name = 'Pricila';
  gender = 'female';
  invitationMap = {
    male: 'invitado',
    female: 'invitada',
  };
  clients = ['Maria', 'Pedro', 'Fernando', 'Hearnando', 'Eduardo'];
  clientsMap = {
    '=0': 'no tenemos ningún cliente esperando',
    '=1': 'tenemos un cliente esperando',
    other: 'tenemos # clientes esperando',
  };
  person = {
    name: 'Pricila',
    age: 30,
    country: 'Potoland',
  };

  myObservableTimer = interval(2000);
  promiseValue = new Promise((resolve, _reject) =>
    setTimeout(() => resolve('Tenemos data en la promesa'), 3500)
  );

  changeClient() {
    this.name = 'Esteban';
    this.gender = 'male';
  }

  deleteClient() {
    this.clients.pop();
  }
}
