import { TestBed } from '@angular/core/testing';

import { UserService } from './user.service';
import { UserHttpService } from '../../infrastructure/http/user-http.service';
import { IUser, IUserCount } from '../../domain/IUser';
import { of } from 'rxjs';

describe('UserService', () => {
  let service: UserService;
  let userHttpServiceMock: jest.Mocked<UserHttpService>;

  beforeEach(() => {
    const userHttpServiceSpy = {
      getUsers: jest.fn(),
      getCountUsers: jest.fn(),
    };

    TestBed.configureTestingModule({
      providers: [
        UserService,
        { provide: UserHttpService, useValue: userHttpServiceSpy },
      ],
    });
    service = TestBed.inject(UserService);
    userHttpServiceMock = TestBed.inject(UserHttpService) as jest.Mocked<UserHttpService>;
  });

  it('should call getUser with the provided page and pageSize', () => {
    const page = 1;
    const pageSize = 10;
    const dummyResponse: IUser[] = [
      {
        id: 1,
        name: 'pablo',
        email: 'prueba@porueba.com',
        password: 'password',
      },
    ];
    userHttpServiceMock.getUsers.mockReturnValue(of(dummyResponse));

    service.getUser(page, pageSize).subscribe((response) => {
      expect(response).toEqual(dummyResponse);
    });

    expect(userHttpServiceMock.getUsers).toHaveBeenCalledWith(page, pageSize);
  });

  it('should call getCountUsers', () => {
    const dummyResponse: IUserCount = {
      totalRecords: 0,
    };
    userHttpServiceMock.getCountUsers.mockReturnValue(of(dummyResponse));

    service.getCountUsers().subscribe((response) => {
      expect(response).toEqual(dummyResponse);
    });

    expect(userHttpServiceMock.getCountUsers).toHaveBeenCalled();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
