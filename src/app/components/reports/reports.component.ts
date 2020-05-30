import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { CountriesListModel } from 'src/app/model/countriesList.model';
import { DataReportService } from 'src/app/services/dataReport.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {
  displayedColumns: string[] = ['name', 'confirmed', 'deaths', 'recovered', 'offset'];
  public dataSource;

  countriesList: CountriesListModel = new CountriesListModel();

  constructor(private router: Router, private dataReport : DataReportService,
    private spinner: NgxSpinnerService) {
    // if (this.router.getCurrentNavigation().extras.state != null &&
    //   this.router.getCurrentNavigation().extras.state.data != null)
    //  this.countriesList = this.router.getCurrentNavigation().extras.state.data.list;
  }

  ngOnInit(): void {
    let list = this.dataReport.getList();
    if(list != null){
      this.countriesList = list;
      this.dataSource = new MatTableDataSource(this.countriesList.countries);
    }
  }

  tableView(){
    this.dataReport.setList(this.countriesList);
    this.router.navigate(["/tableReport"]);
  }

  graphView(){
    this.spinner.show();
    this.dataReport.setList(this.countriesList);
    this.router.navigate(["/graphReport"]);
  }

  offsetSelected(){
    const offsetSelected = (element) => element.offset != null;

    return this.countriesList.countries.some(offsetSelected);
  }
}
