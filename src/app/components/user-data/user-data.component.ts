import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { AdminService } from 'src/app/services/admin.service';
import { UserModel } from 'src/app/model/user.model';
import { UserModalComponent } from './user-data-view/user-data-view.component';
import { MatDialog } from '@angular/material/dialog';


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

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  constructor(private adminService : AdminService,  public dialog: MatDialog) { }

  ngOnInit(): void {
    this.adminService.getAllUser().subscribe( data => {
        this.dataSource = new MatTableDataSource(data);
    })
  }

  viewUserData(element){

    this.adminService.getUser(element.id).subscribe(data =>{
      const dialogRef = this.dialog.open(UserModalComponent, {
        width: '500px',
        height: '500px',
        data: { user: data }
      });
    });
  }
}
