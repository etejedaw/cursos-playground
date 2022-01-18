import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private _historial: string[] = []
  private apiKey = "3zMu33rK3ymkQgzbH5e5tpSh17pG7hPp";
  public resultados: any[] = [];

  constructor(private http: HttpClient) { }

  get historial(){
    return [...this._historial];
  }

  buscarGifs(query: string){
    query = query.trim().toLowerCase();
    if(!this._historial.includes(query)){
      this._historial.unshift(query);
      this._historial = this._historial.splice(0, 10);
    }
    this.http.get(`http://api.giphy.com/v1/gifs/search?api_key=${this.apiKey}&q=${query}&limit=10`)
      .subscribe((resp: any) => this.resultados = resp.data);
  }
  
}
