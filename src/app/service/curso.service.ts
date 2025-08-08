import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CursoService {
  private API_CURSOS = 'http://localhost:3000/cursos';

  constructor(private http: HttpClient) { }


  crearCurso(curso: any): Observable<any> {
    return this.http.post(`${this.API_CURSOS}/cursos.json`, curso);
  }

    getCurso(): Observable<any> {
    return this.http.get(`${this.API_CURSOS}/cursos.json`);
  }

}

