import { Component } from '@angular/core';
import { Country } from '../../interfaces/country.interface';
import { CountriesService } from '../../services/countries.service';

@Component({
  selector: 'app-by-country-page',
  templateUrl: './by-country-page.component.html',
  styleUrl: './by-country-page.component.css',
})
export class ByCountryPageComponent {
  countries: Country[] = [];

  constructor(private readonly countriesService: CountriesService) {}

  seachByCountry(term: string) {
    this.countriesService
      .searchCountry(term)
      .subscribe((countries) => (this.countries = countries));
  }
}
