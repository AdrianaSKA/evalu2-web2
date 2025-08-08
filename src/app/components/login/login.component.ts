import { Component } from '@angular/core';
import { AutenticacionService } from '../../service/autenticacion.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  usuario: string = '';
  password: string = '';
  error: string = '';

  constructor(
    private authService: AutenticacionService,
    private router: Router
  ) { }

  login() {
    const result = this.authService.login(this.usuario, this.password);


    if (typeof result === 'boolean') {
      if (result) {
        const redireccion = localStorage.getItem('redirectUrl') || '/empleados';
        localStorage.removeItem('redirectUrl');
        this.router.navigateByUrl(redireccion);
      } else {
        this.error = 'Error al iniciar sesión';
      }
    }

    else {
      result.subscribe(
        (response: any) => {
          const redireccion = localStorage.getItem('redirectUrl') || '/empleados';
          localStorage.removeItem('redirectUrl');
          this.router.navigateByUrl(redireccion);
        },
        (err: any) => {
          this.error = 'Error al iniciar sesión';
        }
      );
    }
  }
}
