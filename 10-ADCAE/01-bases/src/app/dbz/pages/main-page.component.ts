import { Component } from '@angular/core';
import { DbzService } from '../services/dbz.service';
import { Character } from '../interfaces/character.interface';

@Component({
  selector: 'app-dbz-main-page',
  templateUrl: './main-page.component.html',
})
export class MainPageComponent {
  constructor(private readonly dbzService: DbzService) {}

  get characters() {
    return [...this.dbzService.characters];
  }

  onDeleteCharacter(id: string) {
    this.dbzService.deleteCharacter(id);
  }

  onNewCharacter(character: Character) {
    this.dbzService.newCharacter(character);
  }
}
