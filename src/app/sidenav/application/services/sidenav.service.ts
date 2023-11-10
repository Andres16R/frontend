import { Injectable } from '@angular/core';
import { IMenu } from '../../domain/IMenu';
import { Observable } from 'rxjs';
import { SidenavHttpService } from '../../infrastructure/http/sidenav-http.service';

@Injectable({
  providedIn: 'root',
})
export class SidenavService {

  constructor(private sidenavHttpService: SidenavHttpService) {}

  getMenu(id: string, idType: string, idMenu: string): Observable<IMenu[]> {
    return this.sidenavHttpService.getMenu(id, idType, idMenu);
  }
}
