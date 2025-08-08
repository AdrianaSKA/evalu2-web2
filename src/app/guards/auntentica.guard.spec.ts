import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { auntenticaGuard } from './auntentica.guard';

describe('auntenticaGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => auntenticaGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
