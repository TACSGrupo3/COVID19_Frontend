import { Component, OnInit, ViewChild } from '@angular/core';
import { DataReportService } from 'src/app/services/dataReport.service';
import { MessageService, UIChart } from 'primeng';
import { ReportsService } from 'src/app/services/reports.service';
import { DatePipe } from '@angular/common';
import { CountryModel } from 'src/app/model/country.model';
import { DataGraphModel } from 'src/app/model/dataGraph.model';
import { DataSetsGraphModel } from 'src/app/model/dataSetsGraph.model';
import { BaseChartDirective } from 'ng2-charts';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';

@Component({
  selector: 'app-graph-report',
  templateUrl: './graph-report.component.html',
  styleUrls: ['./graph-report.component.scss']
})
export class GraphReportComponent implements OnInit {
  @ViewChild('linechart1') chart1: UIChart;
  @ViewChild('linechart2') chart2: UIChart;
  @ViewChild('linechart3') chart3: UIChart;


  listOfCountries: Array<CountryModel> = new Array<CountryModel>();

  dataDeaths: DataGraphModel = new DataGraphModel();
  dataRecovered: DataGraphModel = new DataGraphModel();
  dataConfirmed: DataGraphModel = new DataGraphModel();

  optionsDeaths: any;
  optionsRecovered: any;
  optionsConfirmed: any;
  constructor(private dataReport: DataReportService, private messageService: MessageService,
    private reportService: ReportsService, public datepipe: DatePipe, private spinner: NgxSpinnerService,
    private router: Router) {
    this.optionsDeaths = {
      title: {
        display: true,
        text: 'Muertos',
        fontSize: 16
      },
      legend: {
        position: 'bottom'
      }
    };
    this.optionsRecovered = {
      title: {
        display: true,
        text: 'Recuperados',
        fontSize: 16
      },
      legend: {
        position: 'bottom'
      }
    };
    this.optionsConfirmed = {
      title: {
        display: true,
        text: 'Confirmados',
        fontSize: 16
      },
      legend: {
        position: 'bottom'
      }
    };
  }

  ngOnInit(): void {
    let list = this.dataReport.getList();
    if (list?.countries && list.countries.length > 0) {
      let params = [];
      list.countries.forEach(country => {
        if (country.offset && country.idCountry) {
          params.push(country.idCountry);
          params.push(this.getFormattedDate(country.offset))
        }
      });
      this.reportService.getReport(params).subscribe(data => {
        this.listOfCountries = data;

        if (this.listOfCountries)
          this.loadGraph();
      });
    }


  }

  loadGraph() {
    let arrayDates: Array<any> = new Array<any>();

    let maxCount = 0;
    this.listOfCountries.forEach(country => {
      if(maxCount < country.dataReport.length)
        maxCount = country.dataReport.length;
    });

    arrayDates = Array.from(Array(maxCount).keys());
    arrayDates = arrayDates.map(item =>{
      return item = `Día ${item}`
    });

    let datasetsDeaths: Array<DataSetsGraphModel> = new Array<DataSetsGraphModel>();
    let datasetsRecovered: Array<DataSetsGraphModel> = new Array<DataSetsGraphModel>();
    let datasetsConfirmed: Array<DataSetsGraphModel> = new Array<DataSetsGraphModel>();

    for (let i = 0; i < this.listOfCountries.length; i++) {
      let datasetDeaths: DataSetsGraphModel = new DataSetsGraphModel();
      let datasetRecovered: DataSetsGraphModel = new DataSetsGraphModel();
      let datasetConfirmed: DataSetsGraphModel = new DataSetsGraphModel();

      datasetDeaths.label = this.listOfCountries[i].name;
      datasetRecovered.label = this.listOfCountries[i].name;
      datasetConfirmed.label = this.listOfCountries[i].name;

      var randomColor = Math.floor(Math.random() * 16777215).toString(16);
      datasetDeaths.borderColor = `#${randomColor}`;
      var randomColor = Math.floor(Math.random() * 16777215).toString(16);
      datasetRecovered.borderColor = `#${randomColor}`;
      var randomColor = Math.floor(Math.random() * 16777215).toString(16);
      datasetConfirmed.borderColor = `#${randomColor}`;

      datasetDeaths.fill = false;
      datasetRecovered.fill = false;
      datasetConfirmed.fill = false;


      let dataDeaths: Array<string> = new Array<string>();
      let dataRecovered: Array<string> = new Array<string>();
      let dataConfirmed: Array<string> = new Array<string>();

      let index = 0;

      this.listOfCountries[i].dataReport.forEach(dataReport => {
     
        dataDeaths[index] = dataReport.deaths.toString();
        dataRecovered[index] = dataReport.recovered.toString();
        dataConfirmed[index] = dataReport.confirmed.toString();

        index++;
      });
      
      datasetDeaths.data = dataDeaths;
      datasetRecovered.data = dataRecovered;
      datasetConfirmed.data = dataConfirmed;

      datasetsDeaths.push(datasetDeaths);
      datasetsRecovered.push(datasetRecovered);
      datasetsConfirmed.push(datasetConfirmed);
    }

    this.dataDeaths.datasets = datasetsDeaths;
    this.dataRecovered.datasets = datasetsRecovered;
    this.dataConfirmed.datasets = datasetsConfirmed;

    this.dataDeaths.labels = arrayDates;
    this.dataRecovered.labels = arrayDates;
    this.dataConfirmed.labels = arrayDates;

    this.chart1.refresh();
    this.chart2.refresh();
    this.chart3.refresh();
    this.spinner.hide();
  }


  getFormattedDate(date: Date) {
    return this.datepipe.transform(date, 'dd/MM/yyyy');
  }

  selectDataDeaths(event) {
    this.messageService.add({ severity: 'info', summary: 'Data Selected', 'detail': this.dataDeaths.datasets[event.element._datasetIndex].data[event.element._index] });
  }

  selectDataRecovered(event) {
    this.messageService.add({ severity: 'info', summary: 'Data Selected', 'detail': this.dataRecovered.datasets[event.element._datasetIndex].data[event.element._index] });
  }

  selectDataConfirmed(event) {
    this.messageService.add({ severity: 'info', summary: 'Data Selected', 'detail': this.dataConfirmed.datasets[event.element._datasetIndex].data[event.element._index] });
  }


  back(){
    this.router.navigate(['/reports']);
  }

  tableView(){
    this.router.navigate(["/tableReport"]);
  }

}
