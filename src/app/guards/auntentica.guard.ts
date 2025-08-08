import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AutenticacionService } from '../service/autenticacion.service';

export const auntenticaGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authServicio = inject(AutenticacionService);

  if (authServicio.sesionIniciada()) {
    return true;
  } else {
    localStorage.setItem('redirectUrl', state.url);
    return router.parseUrl('/login');
  }
};
