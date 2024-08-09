import { Component } from '@angular/core';

@Component({
  selector: 'app-heroes-hero',
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.css',
})
export class HeroComponent {
  name = 'ironman';
  age = 45;

  get capitalizedName() {
    return this.name.toUpperCase();
  }

  getHeroDescription() {
    return `${this.name} - ${this.age}`;
  }

  changeHero() {
    this.name = 'Spiderman';
  }

  changeAge() {
    this.age = 25;
  }

  resetForm() {
    this.name = 'ironman';
    this.age = 45;
  }
}
