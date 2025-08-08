import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CursoService } from '../../service/curso.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-crear-curso',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './crear-curso.component.html',
  styleUrl: './crear-curso.component.css'
})
export class CrearCursoComponent {
  cursoForm: FormGroup;
  successMessage: string = '';
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private cursosService: CursoService,
    private router: Router
  ) {
    this.cursoForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(5)]],
      descripcion: ['', [Validators.required, Validators.minLength(20)]],
      duracion: ['', [Validators.required, Validators.min(1)]],
      fechaInicio: ['', Validators.required],
      categoria: ['', Validators.required],
      instructor: ['', Validators.required],
      imagenUrl: ['', [Validators.required, this.validateUrl]]
    });
  }

  validateUrl(control: any) {
    try {
      new URL(control.value);
      return null;
    } catch (_) {
      return { invalidUrl: true };
    }
  }

  onSubmit() {
    if (this.cursoForm.valid) {
      const cursoData = this.cursoForm.value;

      this.cursosService.crearCurso(cursoData).subscribe(
        (response) => {
          this.successMessage = 'Curso creado exitosamente';
          this.errorMessage = '';
          setTimeout(() => {
            this.router.navigate(['/cursos']);
          }, 1500);
        },
        (err) => {
          this.errorMessage = err.error?.message || 'Error al crear el curso';
          this.successMessage = '';
        }
      );
    } else {
      this.cursoForm.markAllAsTouched();
    }
  }
}
