import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Character } from '../../interfaces/character.interface';

@Component({
  selector: 'dbz-list',
  templateUrl: './list.component.html',
  styleUrl: './list.component.css',
})
export class ListComponent {
  @Output()
  onDelete = new EventEmitter<string>();

  @Input()
  characterList: Character[] = [];

  onDeleteCharacter(id: string) {
    this.onDelete.emit(id);
  }
}
