import { TestBed } from '@angular/core/testing';
import { SidenavService } from './sidenav.service';
import { SidenavHttpService } from '../../infrastructure/http/sidenav-http.service';
import { of } from 'rxjs';
import { IMenu } from '../../domain/IMenu';

import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('SidenavService', () => {
  let sidenavService: SidenavService;
  let sidenavHttpService: SidenavHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SidenavService, SidenavHttpService],
    });
    sidenavService = TestBed.get(SidenavService);
    sidenavHttpService = TestBed.get(SidenavHttpService);
  });

  it('should be created', () => {
    expect(sidenavService).toBeTruthy();
  });

  it('getMenu should return an Observable of IMenu[]', () => {
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

    jest
      .spyOn(sidenavHttpService, 'getMenu')
      .mockReturnValue(of(dummyResponse));

    sidenavService.getMenu(id, idType, idMenu).subscribe((data) => {
      expect(data).toEqual(dummyResponse);
    });

    expect(sidenavHttpService.getMenu).toHaveBeenCalled();
  });
});
