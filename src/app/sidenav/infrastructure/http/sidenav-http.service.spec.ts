import { TestBed } from '@angular/core/testing';

import { SidenavHttpService } from './sidenav-http.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { IMenu } from '../../domain/IMenu';
import { environment } from '../../../../environments/environment';

describe('DashboardHttpService', () => {
  let service: SidenavHttpService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SidenavHttpService],
    });
    service = TestBed.inject(SidenavHttpService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should call getValidationToken with the correct URL', () => {
    const id = '52';
    const idType = '52';
    const idMenu = '52';
    const dummyResponse: IMenu[] = [
      {
        opcIdentificador: '52',
        opcOpcIdentificador: null,
        opcNombre: 'Afiliaciones',
        opcRuta: null,
        children: [
          {
            opcIdentificador: '53',
            opcOpcIdentificador: '52',
            opcNombre: 'Grupo Familiar',
            opcRuta: '/pages/empleador/consultarGrupoFamiliarEmpleador.jspx',
            children: [],
          },
          {
            opcIdentificador: '55',
            opcOpcIdentificador: '52',
            opcNombre: 'Estadísticas de Afiliación',
            opcRuta: '/pages/empleador/consultarEstadisticasAfiliacion.jspx',
            children: [],
          },
        ],
      },
      {
        opcIdentificador: '50',
        opcOpcIdentificador: null,
        opcNombre: 'Datos del Empleador',
        opcRuta: null,
        children: [
          {
            opcIdentificador: '51',
            opcOpcIdentificador: '50',
            opcNombre: 'Actualizar Información Empleador',
            opcRuta: '/pages/empleador/actualizacionEmpleador.jspx',
            children: [],
          },
        ],
      },
    ];
    service.getMenu(id, idType, idMenu).subscribe((response) => {
      expect(response).toEqual(dummyResponse);
    });

    const url = `${environment.apiURLMenu}/portal-menu/portal/menu?documento=${id}&tipoDoc=${idType}&idMenu=${idMenu}`
    const req = httpMock.expectOne(url);

    expect(req.request.method).toBe('GET');

    req.flush(dummyResponse);

    
    /*const req = httpMock.expectOne('../../../../assets/menu.json');
    expect(req.request.method).toBe('GET');
    req.flush(dummyResponse);*/
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
