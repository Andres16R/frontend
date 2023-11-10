import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { IUser, IUserCount } from '../../domain/IUser';

import { environment }  from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserHttpService {
  private http = inject(HttpClient);

  getUsers(page: number, pageSize: number): Observable<IUser[]> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('pageSize', pageSize.toString());

    const url = `${environment.apiURLUser}/api/data`;
    return this.http.get<any>(url, { params });
  }

  getCountUsers(): Observable<IUserCount> {
    const url = `${environment.apiURLUser}/api/datacount`;
    return this.http.get<any>(url);
  }
}
