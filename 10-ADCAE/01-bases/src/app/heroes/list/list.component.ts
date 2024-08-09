import { Component } from '@angular/core';

@Component({
  selector: 'app-heroes-list',
  templateUrl: './list.component.html',
  styleUrl: './list.component.css',
})
export class ListComponent {
  heroeNames = ['Spiderman', 'Ironman', 'Hulk', 'She Hulk', 'Thor'];
  deletedHero? = '';

  removeLastHeroe() {
    this.deletedHero = this.heroeNames.pop();
  }
}
