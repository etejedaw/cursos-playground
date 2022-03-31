import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-convertidor',
  templateUrl: './convertidor.component.html',
  styleUrls: ['./convertidor.component.css']
})
export class ConvertidorComponent implements OnInit {
  cantidad = 0;
  tengo = "USD";
  quiero = "EUR"
  total = 0;
  monedas = ['USD', 'EUR', 'CLP'];

  constructor() { }

  ngOnInit(): void {
  }

  convertir(){
    switch(this.tengo){
      case 'USD':
        if(this.quiero === 'USD') this.total=this.cantidad;
        if(this.quiero === 'EUR') this.total=this.cantidad*0.85;
        if(this.quiero === 'CLP') this.total=this.cantidad*792.83;
        break;
      case 'EUR':
        if(this.quiero === 'USD') this.total=this.cantidad*1.17;
        if(this.quiero === 'EUR') this.total=this.cantidad;
        if(this.quiero === 'CLP') this.total=this.cantidad*929.2;
        break;
      case 'CLP':
        if(this.quiero === 'USD') this.total=this.cantidad*0.0013;
        if(this.quiero === 'EUR') this.total=this.cantidad*0.0011;
        if(this.quiero === 'CLP') this.total=this.cantidad;
        break;
    }
  }

}
