import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import {
  MatDatepickerInputEvent,
  MatDatepickerModule,
} from '@angular/material/datepicker';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import { AuthService } from '../../../shared/auth/application/services/auth.service';
import { InactivityService } from 'src/app/shared/inactivity/services/inactivity.service';
import { sessionSelector } from '../../../shared/auth/application/store/selectors/session.selectors';
import { SessionState } from '../../../shared/auth/application/store/reducers/session.reducers';
import { UserState } from '../../../shared/auth/application/store/reducers/user.reducer';

import { Store } from '@ngrx/store';

@Component({
  selector: 'app-get-user',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    FormsModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatSelectModule,
    MatNativeDateModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css'],
})
export class CreateUserComponent {
  sessions$ = this.store.select(sessionSelector);
  countrylist = signal<string[]>(['India', 'USA', 'Singapore', 'UK']);
  cadena = signal<string>('');
  selectedFileName = signal('');

  customerform: FormGroup;
  email = new FormControl('', [Validators.required, Validators.email]);
  fecha: string | null = null;
  textInput: string = '';
  submittedText: string = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private inactivityService: InactivityService,
    public stores: Store<UserState>,
    public store: Store<SessionState>
  ) {
    this.customerform = this.fb.group({
      email: this.email,
      fecha: [this.fecha, Validators.required],
      country: ['', Validators.required],
    });
  }

  capturarfile(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const files = inputElement.files;

    if (files) {
      const file = files[0];
      this.selectedFileName.set(file.name);
    }
  }

  ngOnInit(): void {
    this.inactivityService.estaInactivo().subscribe((inactivo) => {
      if (inactivo) {
        this.inactivityService.resetearTemporizador();
      } else {
        this.authService.getRefreskToken();
      }
    });
  }

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

  submitForm() {
    this.submittedText = this.textInput;
  }

  SaveCustomer() {
    this.authService.getRefreskToken().subscribe((data) => {
    });
  }

  clearform() {
    this.customerform.reset();
  }

  // Función para formatear la fecha en el formato deseado
  formatDate(event: MatDatepickerInputEvent<Date>): void {
    const selectedDate = event.value;
    if (selectedDate) {
      this.fecha = selectedDate.toLocaleDateString('en-CO'); // Formato "dd/MM/yyyy"
    }
  }
}
