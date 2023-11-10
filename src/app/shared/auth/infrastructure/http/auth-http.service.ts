import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IToken, ITokenInfo } from '../../domain/IToken';

@Injectable({
  providedIn: 'root',
})
export class AuthHttpService {
  private apiUrl = 'http://127.0.0.1:8081';
  private http = inject(HttpClient);

  getValidationToken(token: string): Observable<IToken> {
    const url = `${this.apiUrl}/ValidarToken`;
    const tokenData = { token: token };

    return this.http.post<IToken>(url, tokenData);
  }

  getRefreskToken(token: string): Observable<ITokenInfo> {
    const url = `${this.apiUrl}/RefreshToken`;
    const tokenData = { token: token };
    return this.http.post<ITokenInfo>(url, tokenData);
  }
}
