import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchGifsResponse } from '../interfaces/gifs.interface';

@Injectable({
  providedIn: 'root',
})
export class GifsService {
  private apiKey: string;
  private _historial: Array<string>;
  private servicioUrl: string;
  resultados: Gif[];

  constructor(private http: HttpClient) {
    this.apiKey = '3zMu33rK3ymkQgzbH5e5tpSh17pG7hPp';
    this._historial = JSON.parse(localStorage.getItem('historial')!) || [];
    this.resultados = JSON.parse(localStorage.getItem('resultados')!) || [];
    this.servicioUrl = 'https://api.giphy.com/v1/gifs';
  }

  get historial(): Array<string> {
    return [...this._historial];
  }

  buscarGifs(query: string) {
    query = query.trim().toLocaleLowerCase();
    if (!this._historial.includes(query)) {
      this._historial.unshift(query);
      this._historial = this._historial.splice(0, 10);
      localStorage.setItem('historial', JSON.stringify(this._historial));
    }

    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('limit', '10')
      .set('q', query);

    this.http
      .get<SearchGifsResponse>(`${this.servicioUrl}/search`, { params })
      .subscribe((resp) => {
        localStorage.setItem('resultados', JSON.stringify(resp.data));
        this.resultados = resp.data;
      });
  }
}
