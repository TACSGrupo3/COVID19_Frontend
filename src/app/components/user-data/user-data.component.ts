import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { AdminService } from 'src/app/services/admin.service';


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
  constructor(private adminService : AdminService) { }

  ngOnInit(): void {
    this.adminService.getAllUser().subscribe( data => {
        this.dataSource = new MatTableDataSource(data);
    })
  }

}
