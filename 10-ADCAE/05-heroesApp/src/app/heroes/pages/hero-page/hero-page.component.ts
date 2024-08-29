import { Component, OnInit } from '@angular/core';
import { HeroesService } from '../../services/heroes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { delay, switchMap } from 'rxjs';
import { Hero } from '../../interfaces/hero.interface';

@Component({
  selector: 'app-hero-page',
  templateUrl: './hero-page.component.html',
  styleUrl: './hero-page.component.css',
})
export class HeroPageComponent implements OnInit {
  hero?: Hero;

  constructor(
    private readonly heroesService: HeroesService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly router: Router
  ) {}

  ngOnInit() {
    this.activatedRoute.params
      .pipe(
        delay(250),
        switchMap((params) => this.heroesService.getHeroe(params['id']))
      )
      .subscribe((hero) => {
        if (!hero) return this.router.navigate(['/heroes.list']);
        this.hero = hero;
        return;
      });
  }

  goBack() {
    this.router.navigateByUrl('/heroes/list');
  }
}
