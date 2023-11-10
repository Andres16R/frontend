import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'users',
        loadChildren: () =>
          import('./user/components/user.router').then(
            (route) => route.USER_ROUTES
          ),
      },
];
