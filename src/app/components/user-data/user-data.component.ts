import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { AdminService } from 'src/app/services/admin.service';
import { UserModel } from 'src/app/model/user.model';
import { UserModalComponent } from './user-data-view/user-data-view.component';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';


export interface UserDialog {
  user: UserModel;
}

@Component({
  selector: 'app-user-data',
  templateUrl: './user-data.component.html',
  styleUrls: ['./user-data.component.scss']
})
export class UserDataComponent implements OnInit {
  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'username', 'view'];
  dataSource;
  pageEvent: PageEvent = new PageEvent();
  pageIndex: number;
  totalElements: number;

  applyFilter(event: Event) {
    this.adminService.getAllUserPaginatedFiltered(0, (event.target as HTMLInputElement).value)
      .subscribe(data => {
        this.totalElements = data.totalElements;
        this.dataSource = new MatTableDataSource(data.content);
      });
  }
  constructor(private adminService: AdminService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.pageIndex = 0;
    this.adminService.getAllUserPaginated(this.pageIndex).subscribe(data => {
      this.totalElements = data.totalElements;
      this.dataSource = new MatTableDataSource(data.content);
    })
  }


  public getServerData(event?: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.adminService.getAllUserPaginated(this.pageIndex).subscribe(data => {
      console.log(data);
      this.dataSource = new MatTableDataSource(data.content);
    })

    return event;
  }

  viewUserData(element) {

    this.adminService.getUser(element.id).subscribe(data => {
      const dialogRef = this.dialog.open(UserModalComponent, {
        width: '500px',
        height: '500px',
        data: { user: data }
      });
    });
  }
}
