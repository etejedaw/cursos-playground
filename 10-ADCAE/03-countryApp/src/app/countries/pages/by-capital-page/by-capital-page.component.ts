import { Component } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country.interface';

@Component({
  selector: 'app-by-capital-page',
  templateUrl: './by-capital-page.component.html',
  styleUrl: './by-capital-page.component.css',
})
export class ByCapitalPageComponent {
  countries: Country[] = [];
  constructor(private readonly countriesService: CountriesService) {}

  searchByCapital(term: string) {
    this.countriesService
      .searchCapital(term)
      .subscribe((countries) => (this.countries = countries));
  }
}
