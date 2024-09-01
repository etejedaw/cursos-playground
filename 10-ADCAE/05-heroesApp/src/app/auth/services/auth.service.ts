import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environments } from '../../../environments/environments';
import { User } from '../interfaces/user.interface';
import { catchError, map, of, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly baseUrl = environments.baseUrl;
  private user?: User;

  constructor(private readonly httpClient: HttpClient) {}

  get currentUser(): User | undefined {
    return structuredClone(this.user);
  }

  login(_email: string, _password: string) {
    return this.httpClient.get<User[]>(`${this.baseUrl}/usuarios?id=1`).pipe(
      map((user) => user[0]),
      tap((user) => (this.user = user)),
      tap((user) => localStorage.setItem('token', user.id.toString()))
    );
  }

  checkAuthentication() {
    if (!localStorage.getItem('token')) return of(false);
    const token = localStorage.getItem('token');
    return this.httpClient.get<User[]>(`${this.baseUrl}/usuarios?id=1`).pipe(
      map((user) => user[0]),
      tap((user) => (this.user = user)),
      map((user) => !!user),
      catchError(() => of(false))
    );
  }

  logout() {
    this.user = undefined;
    localStorage.clear();
  }
}
