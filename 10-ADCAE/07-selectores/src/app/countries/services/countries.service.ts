import { Injectable } from '@angular/core';
import { Region } from '../enums/region';
import { Country, SmallCountry } from '../interfaces/country';
import { Observable, combineLatest, of, tap } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CountriesService {
  private readonly regions = Object.values(Region);
  private readonly baseUrl = 'https://restcountries.com/v3.1';

  constructor(private readonly httpCliente: HttpClient) {}

  getRegions() {
    return this.regions;
  }

  getCountriesByRegion(region: string): Observable<SmallCountry[]> {
    if (!region) return of([]);
    const params = new HttpParams().set('fields', 'cca3,name,borders');
    const url = `${this.baseUrl}/region/${region}`;
    return this.httpCliente.get<SmallCountry[]>(url, { params });
  }

  getCountryByAlphaCode(alphaCode: string): Observable<SmallCountry> {
    if (!alphaCode) return of();
    const params = new HttpParams().set('fields', 'cca3,name,borders');
    const url = `${this.baseUrl}/alpha/${alphaCode}`;
    return this.httpCliente.get<SmallCountry>(url, { params });
  }

  getCountryBordersByCodes(borders: string[]): Observable<SmallCountry[]> {
    if (!borders || borders.length === 0) return of([]);

    const countryRequest = borders.map((code) =>
      this.getCountryByAlphaCode(code)
    );

    return combineLatest(countryRequest);
  }
}
