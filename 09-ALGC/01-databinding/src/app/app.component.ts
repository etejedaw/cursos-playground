import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  name = "Esteban";
  textPlaceholder = "Escribir algo aqui";
  dishabled = true;
  text = "Prueba con event biding";
  message = "";
  constructor(){
    setInterval(() => this.name = "Javier",3000);
    setInterval(() => this.dishabled = false, 5000);
  }
  getSuma(num1: number, num2: number){
    return num1+num2;
  }
  changeText(): void{
    this.text = "Prueba realizada!";
  }
}
