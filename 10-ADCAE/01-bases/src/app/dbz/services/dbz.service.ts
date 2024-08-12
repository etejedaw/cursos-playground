import { Injectable } from '@angular/core';
import { Character } from '../interfaces/character.interface';
import { v4 as uuid } from 'uuid';

@Injectable({ providedIn: 'root' })
export class DbzService {
  characters: Character[] = [
    { id: uuid(), name: 'Krilin', power: 500 },
    { id: uuid(), name: 'Goku', power: 9500 },
    { id: uuid(), name: 'Vegeta', power: 7500 },
  ];

  newCharacter(character: Character) {
    this.characters.push({ id: uuid(), ...character });
  }

  deleteCharacter(id: string) {
    this.characters = this.characters.filter(
      (character) => character.id !== id
    );
  }
}
