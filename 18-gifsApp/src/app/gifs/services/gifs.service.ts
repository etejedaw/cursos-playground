import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchGifsResponse } from '../interfaces/SearchGifsResponse.interfaces';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private _historial: string[] = []
  private apiKey = "3zMu33rK3ymkQgzbH5e5tpSh17pG7hPp";
  private servicioUrl = "http://api.giphy.com/v1/gifs";
  public resultados: Gif[] = [];

  constructor(private http: HttpClient) { 
    if(localStorage.getItem('historial')){
      const data = localStorage.getItem('historial');
      this._historial = JSON.parse(data!);
    }
    if(localStorage.getItem("resultados")){
      const data = localStorage.getItem("resultados");
      this.resultados = JSON.parse(data!);
    }
  }

  get historial(){
    return [...this._historial];
  }

  buscarGifs(query: string){
    query = query.trim().toLowerCase();
    if(!this._historial.includes(query)){
      this._historial.unshift(query);
      this._historial = this._historial.splice(0, 10);
      localStorage.setItem('historial', JSON.stringify(this._historial));
    }
    const params = new HttpParams()
      .set("api_key", this.apiKey)
      .set("q", query)
      .set("limit", "10");

    this.http.get<SearchGifsResponse>(`${this.servicioUrl}/search`, {params})
      .subscribe(resp => {
        this.resultados = resp.data;
        localStorage.setItem('resultados', JSON.stringify(this.resultados));
      });
  }
  
}
