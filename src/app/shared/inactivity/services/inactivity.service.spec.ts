import { InactivityService } from './inactivity.service';
import { CookieService } from 'ngx-cookie-service';
import { of, BehaviorSubject } from 'rxjs';
import { fakeAsync, tick } from '@angular/core/testing';

describe('InactivityService', () => {
  let inactivityService: InactivityService;
  let cookieService: any;

  beforeEach(() => {
    cookieService = {
      delete: jest.fn(),
    };

    inactivityService = new InactivityService(cookieService);
  });

  it('should be created', () => {
    expect(inactivityService).toBeTruthy();
  });

  it('should start in an active state', () => {
    let isActive: boolean | undefined;
    inactivityService.estaInactivo().subscribe((value) => {
      isActive = !value;
    });
    expect(isActive).toBe(true);
  });

  /*it('should become inactive after resetting the timer', fakeAsync(() => {
    let inactivoValue: boolean | undefined;

    inactivityService.resetearTemporizador();
    inactivityService.estaInactivo().subscribe((result) => {
      inactivoValue = result;
    });

    tick(inactivityService.tiempoInactividad + 1);

    expect(inactivoValue).toBe(true);

    expect(cookieService.delete).toHaveBeenCalledWith('name-of-your-cookie'); 
  }));*/
});
