import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'shared-menu',
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css',
})
export class MenuComponent {
  menuItems: MenuItem[] = [];

  ngOnInit() {
    this.menuItems = [
      {
        label: 'Pipes de Angular',
        icon: 'pi pi-desktop',
        items: [
          {
            label: 'Textos y fechas',
            icon: 'pi pi-align-left',
            routerLink: '/',
          },
          { label: 'Números', icon: 'pi pi-dollar', routerLink: '/numbers' },
          { label: 'No Comunes', icon: 'pi pi-globe', routerLink: '/uncommon' },
        ],
      },
      {
        label: 'Pipes Personalizados',
        icon: 'pi pi-cog',
        items: [{ label: 'Otro Elemento', icon: 'pi pi-cog' }],
      },
    ];
  }
}
