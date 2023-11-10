import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { Store } from '@ngrx/store';
import { CookieService } from 'ngx-cookie-service';

import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTooltipModule } from '@angular/material/tooltip';

import { IMenu } from '../domain/IMenu';
import { sessionSelector } from '../../shared/auth/application/store/selectors/session.selectors';
import { SessionState } from '../../shared/auth/application/store/reducers/session.reducers';
import { Session } from 'src/app/shared/auth/domain/ISession';
import { SidenavService } from '../application/services/sidenav.service';
import { environment } from 'src/environments/environment';

import { take } from 'rxjs';

@Component({
  selector: 'app-example-sidenav',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatSidenavModule,
    MatMenuModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    RouterModule,
    MatExpansionModule,
    MatTooltipModule,
  ],
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css'],
})
export class SidenavComponent {
  session: Session = {
    idIPS: '',
    cedula: '',
    address: '',
    appId: '',
    appName: '',
    cellPhone: '',
    city: '',
    code: '',
    complementario: '',
    department: '',
    email: '',
    extOfficePhone: '',
    fax: '',
    firstLastname: '',
    firstName: '',
    hash: '',
    host: '',
    id: '',
    idParameter: '',
    intentos: '',
    ipsCodEpsParameter: '',
    ipsNumeroParameter: '',
    ipsPreCodigoParameter: '',
    lastLogin: '',
    mac: '',
    message: '',
    nameParameter: '',
    officePhone: '',
    password: '',
    phone: '',
    plan: '',
    port: '',
    pwdMustChange: '',
    secondLastname: '',
    secondName: '',
    sessionId: '',
    status: '',
    tidCodigoParameter: '',
    tidParameter: '',
    typeId: '',
    typeIdDescription: '',
    idApplication: '',
    idProfile: '',
    idFilter: '',
    idMenu: '',
    idType: '',
  };

  sessions$ = this.store.select(sessionSelector);
  menuList: IMenu[] = [];
  sessionSignal = signal<Session>(this.session);

  constructor(
    private sidenavService: SidenavService,
    public store: Store<SessionState>,
    private cookieService: CookieService
  ) {}

  private http = inject(HttpClient);
  ngOnInit() {
    this.sessions$.pipe(take(1)).subscribe((sessions) => {
      const parse: Session = { ...sessions[0] };
      this.sessionSignal.set(parse);
    });

    this.sidenavService
      .getMenu(
        this.sessionSignal().cedula,
        this.sessionSignal().idType,
        this.sessionSignal().idMenu
      )
      .subscribe((menu) => {
        this.menuList = menu;
      });
  }

  Close() {
    if (confirm('¿Estás seguro dea salir?')) {
      if (this.cookieService.check(environment.namecookie)) {
        this.cookieService.delete(environment.namecookie);
      } else {
        console.log('La cookie "token" no existe.');
      }
      window.location.href = environment.principalSiteUrl;
    }
  }
}
