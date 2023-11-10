import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthHttpService } from './auth-http.service';
import { IToken, ITokenInfo } from '../../domain/IToken';

describe('AuthHttpService', () => {
  let service: AuthHttpService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthHttpService],
    });
    service = TestBed.inject(AuthHttpService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should send a POST request to validate a token', () => {
    const token = 'your_token_here';
    const expectedResponse: IToken = {
        validation: false
    };

    service.getValidationToken(token).subscribe(response => {
      expect(response).toEqual(expectedResponse);
    });

    const req = httpTestingController.expectOne(request => {
      return request.method === 'POST' && request.url === 'http://127.0.0.1:8081/ValidarToken';
    });

    expect(req.request.body.token).toEqual(token);

    req.flush(expectedResponse);
  });

  it('should send a POST request to refresh a token', () => {
    const token = 'your_token_here';
    const expectedResponse: ITokenInfo = {
        token: ''
    };

    service.getRefreskToken(token).subscribe(response => {
      expect(response).toEqual(expectedResponse);
    });

    const req = httpTestingController.expectOne(request => {
      return request.method === 'POST' && request.url === 'http://127.0.0.1:8081/RefreshToken';
    });

    expect(req.request.body.token).toEqual(token);

    req.flush(expectedResponse);
  });
});
