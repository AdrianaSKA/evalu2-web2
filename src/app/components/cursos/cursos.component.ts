import { DatePipe, UpperCasePipe } from '@angular/common';
import { Component } from '@angular/core';
import { HorasPipe } from '../../pipes/horas.pipe';
import { RouterLink } from '@angular/router';
import { CursoService } from '../../service/curso.service';
import { AutenticacionService } from '../../service/autenticacion.service';

@Component({
  selector: 'app-cursos',
  standalone: true,
  imports: [RouterLink, DatePipe],
  templateUrl: './cursos.component.html',
  styleUrl: './cursos.component.css'
})
export class CursosComponent {
  cursos: any[] = [];
  isAuthenticated: boolean = false;

  constructor(
    private cursosService: CursoService,
    private authService: AutenticacionService
  ) {}

  ngOnInit(): void {
    this.cursosService.getCurso().subscribe(data => {
      this.cursos = Object.keys(data).map(key => ({
        id: key,
        ...data[key]
      }));
    });
  }

}
