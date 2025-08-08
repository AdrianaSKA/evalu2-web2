import { TestBed } from '@angular/core/testing';
import { CanMatchFn } from '@angular/router';

import { loginMatchGuard } from './login-match.guard';

describe('loginMatchGuard', () => {
  const executeGuard: CanMatchFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => loginMatchGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
