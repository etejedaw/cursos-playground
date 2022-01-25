import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Country } from '../interfaces/pais.interface';

@Injectable({
  providedIn: 'root'
})
export class PaisService {

  private apiIRL = "https://restcountries.com/v2"

  get httpParams(){
    return new HttpParams()
      .set('fields', 'name,capital,alpha2Code,flag,population');
  }

  constructor(private http: HttpClient) { }

  buscarPais(termino: string): Observable<Country[]>{
    const url = `${this.apiIRL}/name/${termino}`
    return this.http.get<Country[]>(url, {params: this.httpParams});
  }

  buscarCapital(termino: string): Observable<Country[]>{
    const url = `${this.apiIRL}/capital/${termino}`
    return this.http.get<Country[]>(url, {params: this.httpParams});
  }

  getPaisPorCodigo(id: string): Observable<Country>{
    const url = `${this.apiIRL}/alpha/${id}`
    return this.http.get<Country>(url);
  }

  buscarRegion(region: string): Observable<Country[]>{
    const url = `${this.apiIRL}/regionalbloc/${region}`
    return this.http.get<Country[]>(url, {params: this.httpParams});
  }

}
