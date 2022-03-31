import { Component } from '@angular/core';

@Component({
  selector: 'app-basicos',
  templateUrl: './basicos.component.html',
  styleUrls: ['./basicos.component.css']
})
export class BasicosComponent {

  nombreLower = "Esteban";
  nombreUpper = "ESTEBAN";
  nombreCompleto = "pRIci PoTO"

  fecha = new Date();

}
