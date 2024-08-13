import { Component, Input } from '@angular/core';
import { Gif } from '../../services/gifs.interface';

@Component({
  selector: 'gifs-card-list',
  templateUrl: './card-list.component.html',
  styleUrl: './card-list.component.css',
})
export class CardListComponent {
  @Input()
  gifs: Gif[] = [];
}
