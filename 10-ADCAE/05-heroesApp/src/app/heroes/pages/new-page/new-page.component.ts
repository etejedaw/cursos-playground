import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Hero, Publisher } from '../../interfaces/hero.interface';
import { HeroesService } from '../../services/heroes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, switchMap } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-new-page',
  templateUrl: './new-page.component.html',
  styleUrl: './new-page.component.css',
})
export class NewPageComponent implements OnInit {
  heroForm = new FormGroup({
    id: new FormControl(''),
    superhero: new FormControl('', { nonNullable: true }),
    publisher: new FormControl<Publisher>('DC Comics'),
    alter_ego: new FormControl(''),
    first_appearance: new FormControl(''),
    characters: new FormControl(''),
    alt_img: new FormControl(''),
  });

  publishers = [
    { id: 'DC Comics', desc: 'DC - Comics' },
    { id: 'Marvel Comics', desc: 'Marvel - Comics' },
  ];

  constructor(
    private heroesService: HeroesService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly router: Router,
    private readonly snackBar: MatSnackBar,
    private readonly matDialog: MatDialog
  ) {}

  ngOnInit() {
    if (!this.router.url.includes('edit')) return;
    this.activatedRoute.params
      .pipe(switchMap((params) => this.heroesService.getHeroe(params['id'])))
      .subscribe((hero) => {
        if (!hero) return this.router.navigateByUrl('/');
        this.heroForm.reset(hero);
        return;
      });
  }

  onSubmit() {
    if (this.heroForm.invalid) return;
    if (!this.currentHero.id)
      this.heroesService.addHero(this.currentHero).subscribe((hero) => {
        this.router.navigate(['/heroes/edit', hero.id]);
        this.showSnackbar('Superheroe creado correctamente');
      });
    else
      this.heroesService.updateHero(this.currentHero).subscribe(() => {
        this.router.navigate(['/heroes/list']);
        this.showSnackbar('Superheroe actualizado correctamente');
      });
  }

  get currentHero(): Hero {
    const hero = this.heroForm.value as Hero;
    return hero;
  }

  onDeleteHero() {
    if (!this.currentHero.id) throw new Error('Hero id is required');

    const dialogRef = this.matDialog.open(ConfirmDialogComponent, {
      data: this.heroForm.value,
    });

    dialogRef
      .afterClosed()
      .pipe(
        filter(Boolean),
        switchMap(() => this.heroesService.deleteHero(this.currentHero.id)),
        filter(Boolean)
      )
      .subscribe(() => {
        this.router.navigate(['/heroes/list']);
        this.showSnackbar('Eliminado Correctamente');
      });
  }

  showSnackbar(message: string) {
    this.snackBar.open(message, 'done', { duration: 2500 });
  }
}
