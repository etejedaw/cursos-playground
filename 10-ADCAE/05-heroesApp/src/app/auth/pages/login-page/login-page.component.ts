import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css',
})
export class LoginPageComponent {
  constructor(
    private readonly authService: AuthService,
    private readonly router: Router
  ) {}

  onLogin() {
    this.authService
      .login('test@test.com', '1234')
      .subscribe((user) => this.router.navigate(['/']));
  }
}
