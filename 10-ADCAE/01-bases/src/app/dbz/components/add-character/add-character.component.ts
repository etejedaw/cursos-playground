import { Component, EventEmitter, Output } from '@angular/core';
import { Character } from '../../interfaces/character.interface';

@Component({
  selector: 'bdz-add-character',
  templateUrl: './add-character.component.html',
  styleUrl: './add-character.component.css',
})
export class AddCharacterComponent {
  @Output()
  onNewCharacter = new EventEmitter<Character>();

  character: Character = {
    name: '',
    power: 0,
  };

  emitCharacter() {
    if (!this.character.name) return;
    this.onNewCharacter.emit({ ...this.character });
    this.character.name = '';
    this.character.power = 0;
  }
}
