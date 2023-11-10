import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IPrescriptionInformation } from '../../domain/IUser';

import { InactivityService } from 'src/app/shared/inactivity/services/inactivity.service';
import { AuthService } from 'src/app/shared/auth/application/services/auth.service';

@Component({
  selector: 'app-get-prescriptioninfo',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './get-prescriptioninfo.component.html',
  styleUrls: ['./get-prescriptioninfo.component.css'],
})
export class GetPrescriptioninfoComponent {
  dataIPrescriptionInformation = signal<IPrescriptionInformation>({
    Prescription: '20230928116036866096 - 1',
    identification: 'CC 26433769',
    prescriptionDate: '15/08/2023',
    Affiliate: 'LUCERO GONZALES MOSQUERA',
    IPS: 'CLINICA MEDILASER S.A.S. - NEIVA',
    enablingCode: '410010038501',
    principalDX: 'HIPERTENSION PULMONAR PRIMARIA',
    orphanDisease: 'No',
    medicationType: 'Medicamento',
    stateBoard: 'No requiere junta de profesionales',
    refCounterReference: 'NO',
    activeprinciple: '[SELEXIPAG] 400µg/1U',
    Presentation: 'TABLETA - TABLETAS DE LIBERACION NO MODIFICADA',
    recomIndication:
      'PACIENETE CON HIPERTENSION PULMONARA SEVERA REQUIERE TRIPLE TERAPIA INCLUIDO SELEXIPAG . GUIAS ERS 2022',
    justification:
      'PACIENETE CON HIPERTENSION PULMONARA SEVERA REQUIERE TRIPLE TERAPIA INCLUIDO SELEXIPAG . GUIAS ERS 2022',
  });

  constructor(
    private inactivityService: InactivityService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.inactivityService.estaInactivo().subscribe((inactivo) => {
      if (inactivo) {
        this.inactivityService.resetearTemporizador();
      } else {
        this.authService.getRefreskToken();
      }
    });
  }
}
