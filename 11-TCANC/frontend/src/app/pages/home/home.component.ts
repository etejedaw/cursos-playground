import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Auth } from 'src/app/classes/auth';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  message = '';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get('http://localhost:3000/api/user').subscribe(
      (user: any) => {
        this.message = user.firstName;
        Auth.authEmitter.emit(true);
      },
      () => {
        this.message = 'You are not logged in';
        Auth.authEmitter.emit(false);
      }
    );
  }
}
