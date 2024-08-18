import { Component } from '@angular/core';
import { Country } from '../../interfaces/country.interface';
import { CountriesService } from '../../services/countries.service';

@Component({
  selector: 'app-by-region-page',
  templateUrl: './by-region-page.component.html',
  styleUrl: './by-region-page.component.css',
})
export class ByRegionPageComponent {
  countries: Country[] = [];

  constructor(private readonly countriesService: CountriesService) {}

  searchByRegion(term: string) {
    this.countriesService
      .searchRegion(term)
      .subscribe((countries) => (this.countries = countries));
  }
}
