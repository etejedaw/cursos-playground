import { Component } from '@angular/core';
import { AuthService } from '../../../auth/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-layout-page',
  templateUrl: './layout-page.component.html',
  styleUrl: './layout-page.component.css',
})
export class LayoutPageComponent {
  sidebarItems = [
    { label: 'Listado', icon: 'label', url: 'list' },
    { label: 'Añadir', icon: 'add', url: 'new-hero' },
    { label: 'Buscar', icon: 'search', url: 'search' },
  ];

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router
  ) {}

  onLogout() {
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }

  get user() {
    return this.authService.currentUser;
  }
}
