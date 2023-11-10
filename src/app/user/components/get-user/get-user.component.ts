import { Component, OnInit, ViewChild, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort, Sort, MatSortModule } from '@angular/material/sort';
import { UserService } from '../../application/services/user.service';

import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatCardModule } from '@angular/material/card';
import { IUser } from '../../domain/IUser';

import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { UpdateUserComponent } from '../update-user/update-user.component';
import { InactivityService } from '../../../shared/inactivity/services/inactivity.service';

import { AuthService } from '../../../shared/auth/application/services/auth.service';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-getuser',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatCardModule,
    MatDialogModule,
  ],
  templateUrl: './get-user.component.html',
  styleUrls: ['./get-user.component.css'],
})
export class GetUserComponent implements OnInit {
  private readonly store: Store = inject(Store);

  displayedColumns: string[] = ['id', 'email', 'nombre', 'password'];
  dataSource = new MatTableDataSource<IUser>([]);
  dataUser = signal<MatTableDataSource<IUser>>(
    new MatTableDataSource<IUser>([])
  );
  totalLength = signal<number>(0);
  pageSize = 5; // Cantidad de elementos por página
  pageIndex = 0; // Índice de la página actual
  lengthData = 0;

  pageSizeOptions: number[] = [5, 10, 20];
  selectedPageSize = 5; // Valor inicial
  row: any;
  countUser = signal<number>(0);

  constructor(
    private userService: UserService,
    private _liveAnnouncer: LiveAnnouncer,
    private dialog: MatDialog,
    private inactivityService: InactivityService,
    private authService: AuthService
  ) {}

  @ViewChild(MatSort, { static: false }) sort: MatSort | null = null;

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataUser.set(this.dataSource);
  }

  ngOnInit(): void {
    this.inactivityService.estaInactivo().subscribe((inactivo) => {
      if (inactivo) {
        this.inactivityService.resetearTemporizador();
      } else {
        this.authService.getRefreskToken();
        this.loadPageData();
      }
    });
  }

  getCountUsers(): Promise<number> {
    return new Promise<number>((resolve, reject) => {
      this.userService.getCountUsers().subscribe((data) => {
        this.lengthData = data.totalRecords;
      });
      resolve(this.lengthData);
    });
  }

  async loadPageData() {
    this.countUser.set(await this.getCountUsers());
    await this.getUsers();
  }

  getUsers(): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.userService
        .getUser(this.pageIndex + 1, this.selectedPageSize)
        .subscribe((data) => {
          this.dataSource.data = data;
          this.dataUser.set(this.dataSource);
          this.totalLength.set(this.lengthData);
        });
      resolve(this.dataSource.data);
    });
  }

  onPageChanged(event: any) {
    this.pageIndex = event.pageIndex;
    this.selectedPageSize = event.pageSize;
    this.loadPageData();
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  openDialog(id: string, email: string, nombre: string, password: string) {
    this.dialog.open(UpdateUserComponent, {
      width: '1200px',
      data: { id: id, email: email, name: nombre, password: password },
    });
  }
}
