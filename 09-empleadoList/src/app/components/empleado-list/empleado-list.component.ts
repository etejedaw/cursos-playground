import { Component, OnInit } from '@angular/core';
import { Empleado } from 'src/app/models/Empleado';

@Component({
  selector: 'app-empleado-list',
  templateUrl: './empleado-list.component.html',
  styleUrls: ['./empleado-list.component.css']
})
export class EmpleadoListComponent implements OnInit {
  listEmpleados: Empleado[] = [
    new Empleado(1, "Alvaro", "Henriquez", "Masculino", 25000),
    new Empleado(2, "Jorge", "Gonzalez", "Masculino", 30000),
    new Empleado(3, "Miguel", "Tapia", "Masculino", 50000),
    new Empleado(4, "Claudio", "Narea", "Masculino", 40000),
    new Empleado(5, "Juanita", "Parra", "Femenino", 35000)
  ]
  
  radioButtonSeleccionado = "Todos";

  constructor() { }


  ngOnInit(): void {
  }

  obtenerTotalEmpleados(){
    return this.listEmpleados.length;
  }

  obtenerTotalFemeninos(){
    return this.listEmpleados.filter(list => list.sexo === 'Femenino').length;
  }

  obtenerTotalMasculinos(){
    return this.listEmpleados.filter(list => list.sexo === 'Masculino').length;
  }

  empleadoCountRadioButtonChange(radioButtonSeleccionado: string){
      this.radioButtonSeleccionado = radioButtonSeleccionado;
    }

}
