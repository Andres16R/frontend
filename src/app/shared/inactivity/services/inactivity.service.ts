import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, timer } from 'rxjs';
import { environment } from '../../../../environments/environment';

import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class InactivityService {
  public tiempoInactividad: number = environment.tiempoInactividad; // 4 minutos en milisegundos
  public temporizador: Observable<number>;
  public inactivo = new BehaviorSubject<boolean>(false);

  private temporizadorSubscription: any;

  constructor(private cookieService: CookieService,) {
    this.temporizador = timer(this.tiempoInactividad);
    this.iniciarTemporizador();
  }

  private iniciarTemporizador() {
   this.temporizadorSubscription = this.temporizador.subscribe(() => {
      this.inactivo.next(true);
      this.cookieService.delete(environment.namecookie);
      this.redirigirAUrl(environment.principalSiteUrl);
    });
  }

  resetearTemporizador() {
    this.inactivo.next(false);
    if (this.temporizadorSubscription) {
      this.temporizadorSubscription.unsubscribe();
    }
    this.iniciarTemporizador();
  }

  estaInactivo(): Observable<boolean> {
    return this.inactivo.asObservable();
  }

  redirigirAUrl(url: string) {
    window.location.href = url;
  }
}
