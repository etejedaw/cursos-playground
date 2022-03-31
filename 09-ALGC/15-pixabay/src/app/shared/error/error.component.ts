import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ImagenService } from 'src/app/services/imagen.service';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnInit {

  texto = '';
  mostrar = false;
  suscripcion: Subscription;

  constructor(private _imagenService: ImagenService) { 
    this.suscripcion = this._imagenService.getError().subscribe(data => {
      this.mostrarMensaje();
      this.texto = data;
    });
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void{
     this.suscripcion.unsubscribe();
  }

  mostrarMensaje(): void{
    this.mostrar = true;
    setTimeout(() => {
      this.mostrar = false;
    }, 2000)
  }

}
