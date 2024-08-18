import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CountriesService } from '../../services/countries.service';
import { switchMap } from 'rxjs';
import { Country } from '../../interfaces/country.interface';

@Component({
  selector: 'app-country-page',
  templateUrl: './country-page.component.html',
  styleUrl: './country-page.component.css',
})
export class CountryPageComponent implements OnInit {
  country?: Country;

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly countriesService: CountriesService,
    private readonly router: Router
  ) {}

  ngOnInit() {
    this.activatedRoute.params
      .pipe(
        switchMap((params) =>
          this.countriesService.searchCountryByAlphaCode(params['id'])
        )
      )
      .subscribe((country) => {
        if (!country) return this.router.navigateByUrl('');
        this.country = country;
        console.log(country);
        return;
      });
  }
}
