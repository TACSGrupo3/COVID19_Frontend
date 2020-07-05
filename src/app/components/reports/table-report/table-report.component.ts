import { Component, OnInit } from '@angular/core';
import { DataReportService } from 'src/app/services/dataReport.service';
import { ReportsService } from 'src/app/services/reports.service';
import { CountryModel } from 'src/app/model/country.model';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-table-report',
  templateUrl: './table-report.component.html',
  styleUrls: ['./table-report.component.scss']
})
export class TableReportComponent implements OnInit {
  listOfCountries: Array<CountryModel> = new Array<CountryModel>();

  constructor(private dataReport: DataReportService, private reportService: ReportsService,
    public datepipe: DatePipe, private router : Router, private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    let list = this.dataReport.getList();
    if (!list?.countries && list.countries.length > 0) {
      let params = [];
      list.countries.forEach(country => {
        if (!country?.offset && !country?.id) {
          params.push(country.id);
          params.push(this.getFormattedDate(country.offset))
        }
      });
      this.reportService.getReport(params).subscribe(data =>{
        this.listOfCountries = data;
      });
    }
  }

  getFormattedDate(date: Date) {
      return this.datepipe.transform(date, 'dd/MM/yyyy');
  }

  back(){
    this.router.navigate(['/reports']);
  }

  graphView(){
    this.spinner.show();
    this.router.navigate(["/graphReport"]);
  }
}
