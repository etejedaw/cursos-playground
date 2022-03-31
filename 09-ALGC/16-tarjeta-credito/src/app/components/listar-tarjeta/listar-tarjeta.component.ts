import { Component, OnInit } from '@angular/core';
import {TarjetaService} from "../../services/tarjeta.service";
import TarjetaCredito from "../../models/TarjetaCredito";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-listar-tarjeta',
  templateUrl: './listar-tarjeta.component.html',
  styleUrls: ['./listar-tarjeta.component.css']
})
export class ListarTarjetaComponent implements OnInit {
  listTarjetas: TarjetaCredito[];

  constructor(private _tarjetaService: TarjetaService, private toastr: ToastrService) {
    this.listTarjetas = [];
  }

  ngOnInit(): void {
    this.obtenerTarjetas();
  }

  obtenerTarjetas(){
    this._tarjetaService.obtenerTarjetas().subscribe(doc => {
      this.listTarjetas = [];
      doc.forEach((element: any) => {
        this.listTarjetas.push({
          id: element.payload.doc.id,
          ...element.payload.doc.data()
        });
      });
    });
  }

  eliminarTarjeta(id: any){
    this._tarjetaService.eliminarTarjeta(id)
      .then(() => {
        this.toastr.error('La tarjeta fue eliminada con éxito', 'Registro eliminado')
      })
      .catch(err => console.log(err));
  }

  editarTarjeta(tarjeta: TarjetaCredito){
    this._tarjetaService.addTarjetaEdit(tarjeta);
  }



}
