import { Component } from '@angular/core';
import { Country } from '../../interfaces/pais.interface';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-por-pais',
  templateUrl: './por-pais.component.html',
  styleUrls: ['./por-pais.component.css']
})
export class PorPaisComponent {

  termino = "";
  hayError = false;
  paises: Country[] = [];
  paisesSugeridos: Country[] = [];
  mostrarSugerencias = false;

  constructor(private paisService: PaisService) { }

  buscar(termino: string){
    this.mostrarSugerencias = false;
    this.hayError = false;
    this.termino = termino;
    this.paisService.buscarPais(termino).subscribe({
      next: (paises) => this.paises = paises,
      error: (err) => {
        this.hayError = true;
        this.paises = [];
      }
    });
  }

  sugerencia(termino: string){
    this.hayError = false;
    this.termino = termino;
    this.mostrarSugerencias = true;
    this.paisService.buscarPais(termino)
      .subscribe(paises => this.paisesSugeridos = paises.splice(0,3));
  }

  buscarSugerido(termino: string){
    this.buscar(termino);
  }

}