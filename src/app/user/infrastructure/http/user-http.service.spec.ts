import { TestBed } from '@angular/core/testing';

import { UserHttpService } from './user-http.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { IUser, IUserCount } from '../../domain/IUser';
import { environment } from '../../../../environments/environment';

describe('UserHttpService', () => {
  let service: UserHttpService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserHttpService],
    });
    service = TestBed.inject(UserHttpService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    // Verifica que no haya solicitudes pendientes y limpia la cola de solicitudes
    httpMock.verify();
  });

  it('should retrieve users', () => {
    const page = 1;
    const pageSize = 10;

    const mockUsers: IUser[] = [
      { id: 1, email: 'Usuario 1', name: 'name', password: 'password' },
    ];

    service.getUsers(page, pageSize).subscribe((users) => {
      expect(users).toEqual(mockUsers);
    });

    const req = httpMock.expectOne(
      `${environment.apiURLUser}/api/data?page=${page}&pageSize=${pageSize}`
    );
    expect(req.request.method).toBe('GET');

    // Proporciona una respuesta simulada
    req.flush(mockUsers);
  });

  it('should retrieve user count', () => {
    const mockUserCount: IUserCount = {
      totalRecords: 0,
    };

    service.getCountUsers().subscribe((userCount) => {
      expect(userCount).toEqual(mockUserCount);
    });

    const req = httpMock.expectOne(`${environment.apiURLUser}/api/datacount`);
    expect(req.request.method).toBe('GET');

    req.flush(mockUserCount);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
