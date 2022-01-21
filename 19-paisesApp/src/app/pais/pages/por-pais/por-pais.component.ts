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

  constructor(private paisService: PaisService) { }

  buscar(termino: string){
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
  }


}
