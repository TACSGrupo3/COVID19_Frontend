import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { CountriesListModel } from 'src/app/model/countriesList.model';
import { DataReportService } from 'src/app/services/dataReport.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { TableReportComponent } from './table-report/table-report.component';
import { GraphReportComponent } from './graph-report/graph-report.component';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {
  displayedColumns: string[] = ['name', 'confirmed', 'deaths', 'recovered', 'offset'];
  public dataSource;
  @ViewChild(TableReportComponent) tableReport: TableReportComponent;
  @ViewChild(GraphReportComponent) graphReport: GraphReportComponent;
  countriesList: CountriesListModel = new CountriesListModel();

  view : String = "";

  constructor(private router: Router, private dataReport : DataReportService,
    private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.dataReport.showReport = false;
    let list = this.dataReport.getList();
    if(list != null){
      this.countriesList = list;
      this.dataSource = new MatTableDataSource(this.countriesList.countries);
    }
  }

  tableView(){
    this.dataReport.setList(this.countriesList);  
    this.dataReport.showReport = true;
    this.view = "table";
    this.tableReport.ngOnInit();
    //this.router.navigate(["/tableReport"]);
  }

  graphView(){
    this.spinner.show();
    this.dataReport.setList(this.countriesList);
    this.view = "graph";
    this.graphReport.ngOnInit();
    // this.router.navigate(["/graphReport"]);
  }

  offsetSelected(){
    const offsetSelected = (element) => element.offset != null;

    return this.countriesList.countries.some(offsetSelected);
  }
}
