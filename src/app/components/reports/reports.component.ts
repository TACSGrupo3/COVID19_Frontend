import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';


@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {

  countriesList : any;
  idList : any;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.idList = this.route.snapshot.paramMap.get('id');

    if(this.idList == null){
      console.log("Lista cercana");
    }else{
      console.log("Lista de ID: " + this.idList);
    }
  }

}
