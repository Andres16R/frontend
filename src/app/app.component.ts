import { Component, Injector } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { SidenavComponent } from "./sidenav/components/sidenav.component";

import { AuthService } from './shared/auth/application/services/auth.service';
import { InactivityService } from 'src/app/shared/inactivity/services/inactivity.service';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    imports: [CommonModule, RouterOutlet, SidenavComponent]
})
export class AppComponent {
  private securityService = this.injector.get(AuthService);
  token: string = '';
  validationToken: boolean | undefined;

  constructor(
    private injector: Injector,
    private inactivityService: InactivityService
  ) {}

  ngOnInit(): void {
    // this.inactivityService.estaInactivo().subscribe((inactivo) => {
    //   if (inactivo) {
    //     this.inactivityService.resetearTemporizador();
    //   } else {
    //     this.securityService.checkTokenCookie();
    //   }
    // });
  }
}
