import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'horas',
  standalone: true
})
export class HorasPipe implements PipeTransform {

  transform(horas: number): string {
    return horas === 1 ? `${horas} hora` : `${horas} horas`;
  }

}
