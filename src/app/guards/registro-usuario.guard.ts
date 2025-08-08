import { CanDeactivateFn } from '@angular/router';
import { RegistroComponent } from '../components/registro/registro.component';

export const registroUsuarioGuard: CanDeactivateFn<RegistroComponent>
  = (component, currentRoute, currentState, nextState) => {

    if (component.campoVacios()) {
      return confirm('Tienes datos sin registrar. Seguro quieres abandonar el formulario?')
    }
    return true;
  };
