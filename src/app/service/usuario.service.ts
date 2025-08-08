import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private API_USUSARIOS = 'http://localhost:3000/usuarios';

  constructor(private http: HttpClient) { }


  crearUsuario(usuario: any): Observable<any> {
    return this.http.post(`${this.API_USUSARIOS}/usuarios.json`, usuario);
  }

  getUsuario(): Observable<any> {
    return this.http.get(`${this.API_USUSARIOS}/usuarios.json`);
  }
}
