import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavComponent } from './nav/nav.component';
import { MenuComponent } from './menu/menu.component';

@NgModule({
  declarations: [NavComponent, MenuComponent],
  imports: [CommonModule],
})
export class SecureModule {}
