import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { HttpClientModule } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { JwtModule } from '@auth0/angular-jwt';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { provideStore } from '@ngrx/store';
import { userReducer } from '../app/shared/auth/application/store/reducers/user.reducer';
import { sessionReducer } from './shared/auth/application/store/reducers/session.reducers';

export const appConfig: ApplicationConfig = {
  providers: [
    provideStore({ users: userReducer, session: sessionReducer }),
    importProvidersFrom(
      HttpClientModule,
      JwtModule.forRoot({
        config: {
          tokenGetter: () => localStorage.getItem('token'),
          allowedDomains: ['example.com'],
          disallowedRoutes: ['example.com/unauthorized'],
        },
      }),
      StoreDevtoolsModule.instrument()
    ),
    provideRouter(routes),
    provideAnimations(),
  ],
};
