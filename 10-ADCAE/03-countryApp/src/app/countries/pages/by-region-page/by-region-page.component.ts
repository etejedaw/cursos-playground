import { Component, OnInit } from '@angular/core';
import { Country } from '../../interfaces/country.interface';
import { CountriesService } from '../../services/countries.service';

@Component({
  selector: 'app-by-region-page',
  templateUrl: './by-region-page.component.html',
  styleUrl: './by-region-page.component.css',
})
export class ByRegionPageComponent implements OnInit {
  regions = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'] as const;
  countries: Country[] = [];
  selectedRegion: string = '';
  isLoading = false;

  constructor(private readonly countriesService: CountriesService) {}

  ngOnInit() {
    this.countries = this.countriesService.cacheStore.byRegion.countries;
    this.selectedRegion = this.countriesService.cacheStore.byRegion.term;
  }

  searchByRegion(region: string) {
    this.selectedRegion = region;
    this.countriesService
      .searchRegion(region)
      .subscribe((countries) => (this.countries = countries));
  }
}
