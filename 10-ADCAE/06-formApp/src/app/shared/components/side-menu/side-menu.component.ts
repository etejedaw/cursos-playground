import { Component } from '@angular/core';
import { MenuItem } from './interfaces/menu-item.interface';

@Component({
  selector: 'shared-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrl: './side-menu.component.css',
})
export class SideMenuComponent {
  reactiveMenu: MenuItem[] = [
    { title: 'basicos', route: './reactive/basic' },
    { title: 'dinámicos', route: './reactive/dynamic' },
    { title: 'switches', route: './reactive/switches' },
  ];

  authMenu: MenuItem[] = [{ title: 'Registro', route: './auth/sign-up' }];
}
