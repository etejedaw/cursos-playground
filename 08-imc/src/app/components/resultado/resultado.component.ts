import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-resultado',
  templateUrl: './resultado.component.html',
  styleUrls: ['./resultado.component.css']
})
export class ResultadoComponent implements OnInit {
  imc: number;
  resultado: string;
  interpretacion: string;
  constructor(private route: ActivatedRoute) {
    this.resultado = '';
    this.interpretacion = '';
    this.imc = +route.snapshot.paramMap.get("valor")!;
   }

  ngOnInit(): void {
    this.getResultado();
  }

  getResultado(){
    if(this.imc >= 25){
      this.resultado = 'Exceso de peso';
      this.interpretacion = "Peso corporal superior al normal";
    }
    else if (this.imc >= 18.5){
      this.resultado = 'Normal';
      this.interpretacion = "Peso corporal normal";
    }
    else{
      this.resultado = "Bajo peso";
      this.interpretacion =  "Peso corporal inferior al normal";
    }
  }

}
