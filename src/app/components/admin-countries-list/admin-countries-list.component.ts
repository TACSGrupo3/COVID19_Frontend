import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import { CountriesListModel } from 'src/app/model/countriesList.model';

@Component({
  selector: 'app-admin-countries-list',
  templateUrl: './admin-countries-list.component.html',
  styleUrls: ['./admin-countries-list.component.scss']
})
export class AdminCountriesListComponent implements OnInit {

  constructor(private adminService: AdminService) { }

  countriesList: Array<CountriesListModel>;

  ngOnInit(): void {
    this.today();
  }

  today() {
    this.adminService.getCountriesListsFiltered(1).subscribe(data => {
      this.countriesList = data;
    });
  }

  last3Days() {
    this.adminService.getCountriesListsFiltered(3).subscribe(data => {
      this.countriesList = data;
    });
  }

  lastWeekDays() {
    this.adminService.getCountriesListsFiltered(7).subscribe(data => {
      this.countriesList = data;
    });
  }

  allTimes() {
    this.adminService.getCountriesLists().subscribe(data => {
      this.countriesList = data;
    });
  }


}
