import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImagenService {

  private error$ = new Subject<string>();
  private terminoBusqueda$ = new Subject<string>();

  constructor(private http: HttpClient) { }

  setError(mensaje: string){
    this.error$.next(mensaje);
  }

  getError(): Observable<string>{
    return this.error$.asObservable();
  }

  enviarTerminoBusqueda(termino: string){
    this.terminoBusqueda$.next(termino);
  }

  getTerminoBusqueda(): Observable<string>{
    return this.terminoBusqueda$.asObservable();
  }

  getImagenes(TERMINO: string, imagenesPorPagina: number, paginaActual: number): Observable<any>{
    const KEY = "23879572-3b5a66202ff5c030e4f358b1f";
    const URL = `https://pixabay.com/api/?key=${KEY}&q=${TERMINO}&per_page=${imagenesPorPagina}&page=${paginaActual}`;
    return this.http.get(URL);
  }
}
