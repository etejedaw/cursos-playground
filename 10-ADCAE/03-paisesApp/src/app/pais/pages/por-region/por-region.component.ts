import { Component } from '@angular/core';
import { Country } from '../../interfaces/pais.interface';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-por-region',
  templateUrl: './por-region.component.html',
  styleUrls: ['./por-region.component.css'],
})
export class PorRegionComponent {
  regiones: string[];
  regionActiva: string;
  paises: Country[];

  constructor(private paisService: PaisService) {
    this.regiones = ['africa', 'americas', 'asia', 'europe', 'oceania'];
    this.regionActiva = '';
    this.paises = [];
  }

  activarRegion(region: string) {
    if (region === this.regionActiva) return;
    this.paises = [];
    this.regionActiva = region;
    this.paisService
      .buscarRegion(region)
      .subscribe((paises) => (this.paises = paises));
  }

  getClaseCss(region: string) {
    return region === this.regionActiva
      ? 'btn btn-primary'
      : 'btn btn-outline-primary';
  }
}
