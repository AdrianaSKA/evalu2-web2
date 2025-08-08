import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegistroComponent } from './components/registro/registro.component';
import { CursosComponent } from './components/cursos/cursos.component';
import { CrearCursoComponent } from './components/crear-curso/crear-curso.component';
import { loginMatchGuard } from './guards/login-match.guard';
import { registroUsuarioGuard } from './guards/registro-usuario.guard';
import { auntenticaGuard } from './guards/auntentica.guard';

export const routes: Routes = [
    {
        path: 'login',
        component: LoginComponent,
        canMatch: [loginMatchGuard]
    },
    {
        path: 'registro',
        component: RegistroComponent,
        canMatch: [loginMatchGuard],
        canDeactivate: [registroUsuarioGuard]
    },
    {
        path: 'cursos',
        component: CursosComponent,
        canActivate: [auntenticaGuard]
    },
    {
        path: 'crear-curso',
        component: CrearCursoComponent,
        canActivate: [auntenticaGuard]
    },
    { path: '', redirectTo: '/cursos', pathMatch: 'full' },
    { path: '**', redirectTo: '/cursos' }
];
