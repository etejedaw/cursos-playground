import { Component } from '@angular/core';
import { Country } from '../../interfaces/pais.interface';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-por-pais',
  templateUrl: './por-pais.component.html',
  styleUrls: ['./por-pais.component.css'],
})
export class PorPaisComponent {
  termino: string;
  hayError: boolean;
  paises: Country[];
  paisesSugeridos: Country[];
  mostrarSugerencias: boolean;

  constructor(private paisService: PaisService) {
    this.termino = '';
    this.hayError = false;
    this.paises = [];
    this.paisesSugeridos = [];
    this.mostrarSugerencias = false;
  }

  buscar(termino: string) {
    this.mostrarSugerencias = false;
    this.hayError = false;
    this.termino = termino;
    this.paisService.buscarPais(this.termino).subscribe({
      next: (paises) => (this.paises = paises),
      error: () => {
        this.hayError = true;
        this.paises = [];
      },
    });
  }

  sugerencias(termino: string) {
    this.mostrarSugerencias = true;
    this.hayError = false;
    this.termino = termino;
    this.paisService.buscarPais(termino).subscribe({
      next: (paises) => (this.paisesSugeridos = paises.splice(0, 3)),
      error: () => (this.paisesSugeridos = []),
    });
  }

  buscarSugerido() {
    this.buscar(this.termino);
  }
}
