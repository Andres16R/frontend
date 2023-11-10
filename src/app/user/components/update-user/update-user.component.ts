import { Component, Inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { InactivityService } from 'src/app/shared/inactivity/services/inactivity.service';
import { AuthService } from 'src/app/shared/auth/application/services/auth.service';
import { IUser } from '../../domain/IUser';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';

import { MatExpansionModule } from '@angular/material/expansion';

import { GetPrescriptioninfoComponent } from "../get-prescriptioninfo/get-prescriptioninfo.component";
import { GetNutritionalproductComponent } from "../get-nutritionalproduct/get-nutritionalproduct.component";

@Component({
    selector: 'app-update-user',
    standalone: true,
    templateUrl: './update-user.component.html',
    styleUrls: ['./update-user.component.css'],
    imports: [
        CommonModule,
        MatFormFieldModule,
        MatButtonModule,
        MatIconModule,
        MatCardModule,
        MatInputModule,
        MatTabsModule,
        MatToolbarModule,
        MatExpansionModule,
        GetPrescriptioninfoComponent,
        GetNutritionalproductComponent
    ]
})
export class UpdateUserComponent {
  step = 0;
  dataUser = signal<IUser>({
    id: 0,
    name: '',
    email: '',
    password: '',
  });

  constructor(
    public dialogRef: MatDialogRef<UpdateUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IUser,
    private inactivityService: InactivityService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.dataUser.set(this.data);
    this.inactivityService.estaInactivo().subscribe((inactivo) => {
      if (inactivo) {
        this.inactivityService.resetearTemporizador();
      } else {
        this.authService.getRefreskToken();
      }
    });
  }

  closeDialog(): void {
    // Cierra el diálogo
    this.dialogRef.close();
  }
  onClear(): void {
  }

  onUpdate(): void {

  }

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }
}
