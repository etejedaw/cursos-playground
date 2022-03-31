import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  leftDice = "../assets/img/dice1.png";
  rightDice = "../assets/img/dice1.png";
  num1 = 0;
  num2 = 1;
  rollDice(): void{
    this.num1 = Math.round(Math.random()*5)+1;
    this.num2 = Math.round(Math.random()*5)+1;
    this.leftDice = `../assets/img/dice${this.num1}.png`
    this.rightDice = `../assets/img/dice${this.num2}.png`
  }
}
