import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AutenticacionService {
  private apiUrl = 'http://localhost:3000/usuarios'; // Ajusta esta URL
  private currentUserSubject = new BehaviorSubject<any>(null);

  constructor(private http: HttpClient) {
    const user = localStorage.getItem('currentUser');
    if (user) {
      this.currentUserSubject.next(JSON.parse(user));
    }
  }

  private usuarioValido = {
    usuario: 'Joel',
    password: '123456',
  };

  login(usuario: string, password: string): Observable<boolean> | boolean {
    // Modo local (desarrollo)
    if (usuario === this.usuarioValido.usuario && password === this.usuarioValido.password) {
      localStorage.setItem('currentUser', JSON.stringify({ usuario }));
      this.currentUserSubject.next({ usuario });
      return true;
    }
    
    // Modo API (producción)
    return new Observable<boolean>(subscriber => {
      this.http.post<any>(`${this.apiUrl}/login`, { usuario, password }).subscribe({
        next: (response) => {
          if (response && response.token) {
            localStorage.setItem('currentUser', JSON.stringify(response.user));
            localStorage.setItem('token', response.token);
            this.currentUserSubject.next(response.user);
            subscriber.next(true);
          } else {
            subscriber.next(false);
          }
          subscriber.complete();
        },
        error: (err) => {
          subscriber.next(false);
          subscriber.complete();
        }
      });
    });
  }

  sesionIniciada(): boolean {
    return this.currentUserSubject.value !== null;
  }

  get currentUserValue(): any {
    return this.currentUserSubject.value;
  }

  get currentUser$() {
    return this.currentUserSubject.asObservable();
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('token');
    this.currentUserSubject.next(null);
  }

  registrar(nombre: string, email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/registro`, { nombre, email, password });
  }
}
