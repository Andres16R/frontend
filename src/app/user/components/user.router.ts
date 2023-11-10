import { Routes } from '@angular/router';
import { AuthGuard } from 'src/app/shared/auth/application/guard/auth.guard';

export const USER_ROUTES: Routes = [
  {
    canActivate: [AuthGuard],
    data: {  roles: ['15', '16'] },
    path: 'getuser',
    loadComponent: () =>
      import('./get-user/get-user.component').then(
        (mod) => mod.GetUserComponent
      ),
  },
  {
    path: 'createuser',
    loadComponent: () =>
      import('./create-user/create-user.component').then(
        (mod) => mod.CreateUserComponent
      ),
  },
];
