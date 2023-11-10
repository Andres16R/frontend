import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IMedicalDiagnostic } from '../../domain/IUser';
import { InactivityService } from 'src/app/shared/inactivity/services/inactivity.service';
import { AuthService } from 'src/app/shared/auth/application/services/auth.service';

@Component({
  selector: 'app-get-nutritionalproduct',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './get-nutritionalproduct.component.html',
  styleUrls: ['./get-nutritionalproduct.component.css'],
})
export class GetNutritionalproductComponent {
  dataIMedicalDiagnostic = signal<IMedicalDiagnostic>({
    VHIdiagnosis: 'Sin Diagostico',
    CancerDiagnosis: 'Sin Diagostico',
    kidneyDiagnosis: 'Sin Diagostico',
    malnutritionDiagnosis: 'Sin Diagostico',
    dose: '1320 mililitros(s)',
    frequencyadministration: '24 HORA(S)',
    duration: '30 DIA(S)',
    amount: '180 Botella',
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
