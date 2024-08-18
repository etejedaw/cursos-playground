import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Country } from '../interfaces/country.interface';
import { catchError, map, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CountriesService {
  private readonly apiUrl = 'https://restcountries.com/v3.1';

  constructor(private readonly httpClient: HttpClient) {}

  searchCountryByAlphaCode(code: string) {
    const url = `${this.apiUrl}/alpha/${code}`;
    return this.httpClient.get<Country[]>(url).pipe(
      map((countries) => (countries.length > 0 ? countries[0] : undefined)),
      catchError((_error) => of(undefined))
    );
  }

  searchCapital(term: string) {
    const url = `${this.apiUrl}/capital/${term}`;
    return this.httpClient
      .get<Country[]>(url)
      .pipe(catchError((_error) => of([])));
  }

  searchCountry(term: string) {
    const url = `${this.apiUrl}/name/${term}`;
    return this.httpClient
      .get<Country[]>(url)
      .pipe(catchError((_error) => of([])));
  }

  searchRegion(term: string) {
    const url = `${this.apiUrl}/region/${term}`;
    return this.httpClient
      .get<Country[]>(url)
      .pipe(catchError((_error) => of([])));
  }
}
