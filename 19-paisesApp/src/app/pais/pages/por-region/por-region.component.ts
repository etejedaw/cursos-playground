import { Component} from '@angular/core';
import { Country } from '../../interfaces/pais.interface';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-por-region',
  templateUrl: './por-region.component.html',
  styleUrls: ['./por-region.component.css']
})
export class PorRegionComponent{

  regiones: string[] = ["EU", "EFTA", "CARICOM", "PA", "AU", "USAN", "EEU", "AL", "ASEAN", "CAIS", "CEFTA", "NAFTA", "SAARC"];
  regionActiva = "";
  paises: Country[] = [];
  
  constructor(private paisServide: PaisService) { }

  activarRegion(region: string){
    if(region === this.regionActiva) return;
    this.regionActiva = region;
    this.paises = [];
    this.paisServide.buscarRegion(region).subscribe(paises => this.paises = paises);
  }

  getClaseCSS(region: string): string{
    if(region === this.regionActiva) return 'btn btn-primary';
    return 'btn btn-outline-primary';
  }

}
