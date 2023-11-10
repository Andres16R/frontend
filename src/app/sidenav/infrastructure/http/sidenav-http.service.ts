import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { IMenu } from '../../domain/IMenu';
import { Observable } from 'rxjs';
import { environment } from  '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SidenavHttpService {
  private http = inject(HttpClient);

  getMenu(id: string, idType: string, idMenu: string): Observable<IMenu[]> {
    const url = `${environment.apiURLMenu}/operationalManagerPlatform/portal/menu/${id}/${idType}/${idMenu}`;

    return this.http.get<IMenu[]>(url);
  }
}
