
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

export interface User { username: string; }

@Injectable({ providedIn: 'root' })
export class AuthService {
  private userSubject = new BehaviorSubject<User|null>(null);
  public user$ = this.userSubject.asObservable();

  constructor(private http: HttpClient) {}
  login(username: string, password: string) {
    return this.http
      .post<User>('http://localhost:5007/api/auth/login', { username, password })
      .pipe(
        tap(user => this.userSubject.next(user)),
        catchError(err => {
          this.userSubject.next(null);
          return of(null);
        })
      );
  }

  logout(): void {
    this.userSubject.next(null);
  }

  get isLoggedIn(): boolean {
    return !!this.userSubject.value;
  }
}
