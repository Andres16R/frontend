import { Injectable, signal } from '@angular/core';
import { AuthHttpService } from '../../infrastructure/http/auth-http.service';
import { Observable, of } from 'rxjs';
import { IToken, ITokenInfo } from '../../domain/IToken';
import { CookieService } from 'ngx-cookie-service';

import { Store } from '@ngrx/store';

import * as sessionAction from '../store/actions/session.action';
import { SessionState } from '../store/reducers/session.reducers';
import { Session } from '../../domain/ISession';

import { UserState } from '../store/reducers/user.reducer';

import { environment } from '../../../../../environments/environment';
import { sessionSelector } from '../store/selectors/session.selectors';
import { ActivatedRouteSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  sessions: Observable<Session[]> = this.store.select(sessionSelector);
  validationToken: boolean | undefined;
  validationGuard: boolean = false;
  private readonly INVALID_TOKEN = false;
  token: string = '';
  task = signal('');
  tokenData: any;

  constructor(
    private authHttpService: AuthHttpService,
    private cookieService: CookieService,
    public store: Store<SessionState>,
    public stores: Store<UserState>
  ) {}

  getValidationToken(token: string): Observable<IToken> {
    return this.authHttpService.getValidationToken(token);
  }

  getRefreskToken(): Observable<ITokenInfo> {
    const token = this.cookieService.get(environment.namecookie);
    if (token) {
      const tokenData = this.parseJwt(token);
      if (tokenData?.exp) {
        const expirationTimeInSeconds = tokenData.exp;
        const currentTimeInSeconds = Math.floor(Date.now() / 1000);
        console.log('currentTimeInSeconds:' + currentTimeInSeconds);
        if (currentTimeInSeconds < expirationTimeInSeconds) {
          const timeRemainingInSeconds =
            expirationTimeInSeconds - currentTimeInSeconds;
          const refreshThreshold = 60 * 8;
          console.log('timeRemainingInSeconds 2:' + timeRemainingInSeconds);
          if (timeRemainingInSeconds <= refreshThreshold) {
            console.log('Se ejecuto la actualizacion del token');
            this.authHttpService.getRefreskToken(token).subscribe((data) => {
              this.cookieService.set(
                environment.namecookie,
                data.token,
                600,
                '/'
              );
              console.log(data.token);
            });
          }
        }
      }
    }
    return new Observable<ITokenInfo>();
  }

  getAuthToken(route:ActivatedRouteSnapshot): Observable<boolean> {
    const idProfilesGuard = route.data['roles'];
    this.sessions.subscribe((sessions) => {
      for (const session of sessions) {
        const idProfiles = session.idProfile.split(',');
        if (idProfiles.some(number => idProfilesGuard.includes(number))
        ) {
          this.validationGuard = true;
        } else {
          this.validationGuard = false;
        }
      }
    });
    return of(this.validationGuard);
  }

  checkTokenCookie(): void {
    const token = this.cookieService.get(environment.namecookie);
    if (token) {
      const tokenData = this.parseJwt(token); // Función para decodificar el token JWT
      const session: Session = {
        idIPS: tokenData.idIPS,
        cedula: tokenData.cedula,
        city: tokenData.city,
        status: tokenData.status,
        address: tokenData.address,
        appId: tokenData.appId,
        appName: tokenData.appName,
        cellPhone: tokenData.cellPhone,
        code: tokenData.code,
        complementario: tokenData.complementario,
        department: tokenData.department,
        email: tokenData.email,
        extOfficePhone: tokenData.extOfficePhone,
        fax: tokenData.fax,
        firstLastname: tokenData.firstLastname,
        firstName: tokenData.firstName,
        hash: tokenData.hash,
        host: tokenData.host,
        id: tokenData.id,
        idParameter: tokenData.idParameter,
        intentos: tokenData.intentos,
        ipsCodEpsParameter: tokenData.ipsCodEpsParameter,
        ipsNumeroParameter: tokenData.ipsNumeroParameter,
        ipsPreCodigoParameter: tokenData.ipsPreCodigoParameter,
        lastLogin: tokenData.lastLogin,
        mac: tokenData.mac,
        message: tokenData.message,
        nameParameter: tokenData.nameParameter,
        officePhone: tokenData.officePhone,
        password: tokenData.password,
        phone: tokenData.phone,
        plan: tokenData.plan,
        port: tokenData.port,
        pwdMustChange: tokenData.pwdMustChange,
        secondLastname: tokenData.secondLastname,
        secondName: tokenData.secondName,
        sessionId: tokenData.sessionId,
        tidCodigoParameter: tokenData.tidCodigoParameter,
        tidParameter: tokenData.tidParameter,
        typeId: tokenData.typeId,
        typeIdDescription: tokenData.typeIdDescription,
        idApplication: tokenData.idApplication,
        idProfile: tokenData.idProfile,
        idFilter: tokenData.idFilter,
        idMenu: tokenData.idMenu,
        idType: tokenData.idType,
      };
      this.store.dispatch(sessionAction.addSession(session));
      if (tokenData?.exp) {
        const expirationTimeInSeconds = tokenData.exp;
        const currentTimeInSeconds = Math.floor(Date.now() / 1000); // Convierte la hora actual a segundos
        if (currentTimeInSeconds < expirationTimeInSeconds) {
          const expirationDate = new Date(expirationTimeInSeconds * 1000); // Convierte a milisegundos
          console.log('Fecha de vencimiento del token:', expirationDate);

          console.log('El token aún es válido.');
          const timeRemainingInSeconds =
            expirationTimeInSeconds - currentTimeInSeconds;
          const timeRemainingInMinutes = Math.floor(
            timeRemainingInSeconds / 60
          );
          console.log(
            'Tiempo restante de la cookie en minutos:',
            timeRemainingInMinutes
          );

          this.getValidationToken(token).subscribe((data) => {
            this.validationToken = data.validation;
            console.log(data);
          });

          if (this.validationToken === this.INVALID_TOKEN) {
            window.location.href = environment.principalSiteUrl;
          }
        } else {
          console.log('El token ha expirado.');
        }
      } else {
        window.location.href = environment.principalSiteUrl;
      }
    } else {
      window.location.href = environment.principalSiteUrl;
    }
  }

  parseJwt(token: any) {
    if (typeof token !== 'string') {
      return null;
    }

    const parts = token.split('.');
    if (parts.length !== 3) {
      return null;
    }

    const base64Url = parts[1];
    const base64 = base64Url.replace('-', '+').replace('_', '/');
    return JSON.parse(atob(base64));
  }
}
