import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {TarjetaService} from "../../services/tarjeta.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-crear-tarjeta',
  templateUrl: './crear-tarjeta.component.html',
  styleUrls: ['./crear-tarjeta.component.css']
})
export class CrearTarjetaComponent implements OnInit {
  form: FormGroup
  loading: boolean
  titulo: string;
  id: string | undefined;
  constructor(private fb: FormBuilder, private _tarjetaService: TarjetaService, private toastr: ToastrService) {
    this.titulo = "Agregar tarjeta";
    this.loading = false;
    this.form = this.fb.group({
      titular: ['', Validators.required],
      numeroTarjeta: ['', [Validators.required, Validators.minLength(16), Validators.maxLength(16)]],
      fechaExpiracion: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(5)]],
      cvv: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(3)]],
    });
  }

  ngOnInit(): void {
    this._tarjetaService.getTarjetaEdit().subscribe(data => {
      this.id = data.id;
      this.titulo = "Editar tarjeta";
      this.form.patchValue({
        titular: data.titular,
        numeroTarjeta: data.numeroTarjeta,
        fechaExpiracion: data.fechaExpiracion,
        cvv: data.cvv
      })
    });
  }

  guardarTarjeta() {
    if(this.id === undefined) this.agregarTarjeta();
    else this.editarTarjeta(this.id);
  }

  agregarTarjeta(){
    const tarjetaCredito = {
      titular: this.form.value.titular,
      numeroTarjeta: this.form.value.numeroTarjeta,
      fechaExpiracion: this.form.value.fechaExpiracion,
      cvv: this.form.value.cvv,
      fechaCreacion: new Date(),
      fechaActualizacion: new Date()
    }
    this.loading = true;
    this._tarjetaService.guardarTarjeta(tarjetaCredito)
      .then(() => {
        this.loading = false;
        this.toastr.success('La tarjeta fue registrada con éxito', 'Tarjeta registrada')
        this.form.reset()
      })
      .catch(err => {
        this.loading = false;
        this.toastr.error('Ocurrió un error', 'Error');
      });
  }

  editarTarjeta(id: string){
    const tarjetaCredito = {
      titular: this.form.value.titular,
      numeroTarjeta: this.form.value.numeroTarjeta,
      fechaExpiracion: this.form.value.fechaExpiracion,
      cvv: this.form.value.cvv,
      fechaActualizacion: new Date()
    }
    this.loading = true;
    this._tarjetaService.editarTarjeta(id, tarjetaCredito)
      .then(() => {
        this.loading = false;
        this.titulo = "Agregar Tarjeta";
        this.form.reset();
        this.id = undefined;
      })
      .catch(err => console.log(err));
  }

}
