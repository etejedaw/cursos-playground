import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  studentList = [
    {name: "Prici", status: "Aprobado"},
    {name: "Tebi", status: "Regular"},
    {name: "Tamara", status: "Reprobado"}
  ];
  show = true;
  toggle():void{
    this.show = !this.show;
  }
}
