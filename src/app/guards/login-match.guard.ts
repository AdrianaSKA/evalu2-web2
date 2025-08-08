import { CanMatchFn } from '@angular/router';
import { AutenticacionService } from '../service/autenticacion.service';
import { inject } from '@angular/core';

export const loginMatchGuard: CanMatchFn = (route, segments) => {
  const authServicio = inject(AutenticacionService);
  return !authServicio.sesionIniciada();
};
