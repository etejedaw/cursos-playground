import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { CountriesService } from '../../services/countries.service';
import { filter, switchMap, tap } from 'rxjs';
import { SmallCountry } from '../../interfaces/country';

@Component({
  selector: 'app-selector-page',
  templateUrl: './selector-page.component.html',
  styleUrl: './selector-page.component.css',
})
export class SelectorPageComponent implements OnInit {
  selectorForm = this.formBuilder.group({
    region: ['', Validators.required],
    country: ['', Validators.required],
    border: ['', Validators.required],
  });

  countriesByRegion: SmallCountry[] = [];
  borders: SmallCountry[] = [];

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly countriesService: CountriesService
  ) {}

  ngOnInit() {
    this.onRegionChanged();
    this.onCountryChange();
  }

  getRegions() {
    return this.countriesService.getRegions();
  }

  private onRegionChanged() {
    this.selectorForm
      .get('region')!
      .valueChanges.pipe(
        tap(() => this.selectorForm.get('country')?.setValue('')),
        tap(() => (this.borders = [])),
        switchMap((region) =>
          this.countriesService.getCountriesByRegion(region!)
        )
      )
      .subscribe((countries) => (this.countriesByRegion = countries));
  }

  private onCountryChange() {
    this.selectorForm
      .get('country')!
      .valueChanges.pipe(
        filter((value) => (value?.length || 0) > 0),
        tap(() => this.selectorForm.get('border')!.setValue('')),
        switchMap((alphaCode) =>
          this.countriesService.getCountryByAlphaCode(alphaCode!)
        ),
        switchMap((country) =>
          this.countriesService.getCountryBordersByCodes(country.borders)
        )
      )
      .subscribe((countries) => (this.borders = countries));
  }
}
