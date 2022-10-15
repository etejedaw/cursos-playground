import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-basicos',
  templateUrl: './basicos.component.html',
  styleUrls: ['./basicos.component.css'],
})
export class BasicosComponent {
  nombreLower = 'esteban';
  nombreUpper = 'ESTEBAN';
  nombreCompleto = 'EsTeBaN tEjEdA';
  fecha = new Date();
}
