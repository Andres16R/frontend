import { Injectable } from '@angular/core';
import { UserHttpService } from '../../infrastructure/http/user-http.service';
import { Observable } from 'rxjs';
import { IUser, IUserCount } from '../../domain/IUser';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private userHttpService: UserHttpService) {}

  getUser(page: number, pageSize: number): Observable<IUser[]> {
    return this.userHttpService.getUsers(page, pageSize);
  }

  getCountUsers(): Observable<IUserCount> {
    return this.userHttpService.getCountUsers();
  }
}
