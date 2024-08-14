import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'shared-lazy-image',
  templateUrl: './lazy-image.component.html',
  styleUrl: './lazy-image.component.css',
})
export class LazyImageComponent implements OnInit {
  @Input()
  url!: string;

  @Input()
  alt = '';

  hasLoaded = false;

  ngOnInit(): void {
    if (!this.url) throw new Error('URL property is requeried');
  }

  onLoad() {
    this.hasLoaded = true;
  }
}
