import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AutenticacionService } from '../../service/autenticacion.service';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css'
})
export class RegistroComponent {
  registroForm: FormGroup;
  enviado: boolean = false;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private authService: AutenticacionService,
    private router: Router
  ) {
    this.registroForm = this.fb.group({
      nombre: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, { validator: this.passwordMatchValidator });
  }

  passwordMatchValidator(form: FormGroup) {
    return form.get('password')?.value === form.get('confirmPassword')?.value 
      ? null : { mismatch: true };
  }

  registrar() {
    if (this.registroForm.valid) {
      const { nombre, email, password } = this.registroForm.value;
      
      this.authService.registrar(nombre, email, password).subscribe(
        (response: any) => {
          if (response.token) {
            localStorage.setItem('auth_token', response.token);
            this.enviado = true;
            const redirectUrl = localStorage.getItem('redirectUrl') || '/cursos';
            this.router.navigateByUrl(redirectUrl);
          }
        },
        (err: any) => {
          this.errorMessage = err.error?.message || 'Error en el registro';
        }
      );
    } else {
      this.registroForm.markAllAsTouched();
    }
  }

  campoVacios(): boolean {
    return !this.enviado && Object.values(this.registroForm.value).some(
      (valor: any) => valor?.toString().trim() !== ''
    );
  }

  
}
