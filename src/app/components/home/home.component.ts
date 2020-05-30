import { Component, OnInit } from '@angular/core';
import { CountriesServices } from 'src/app/services/countries.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { AuthService } from 'src/app/services/auth.service';
import { DataReportService } from 'src/app/services/dataReport.service';

export interface DialogData {
  nearCountries: any;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public nearCountries: any;
  public enableLocation : boolean = false;
  public open : boolean = false;
  public userAgent: any;
  constructor(private countriesServices: CountriesServices, public authService : AuthService,
    private router: Router,public dialog: MatDialog, private dataReport : DataReportService) { }

  ngOnInit(): void {
    let cantidadPaises = 5;
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(data => {
        this.countriesServices.findNearCountries(data.coords.latitude, data.coords.longitude, cantidadPaises.toString()).subscribe(data => {
          this.enableLocation = true;
          this.nearCountries = data;
        }, error => {
          console.log(error);
          this.enableLocation = false;
        });
      });
    }
  }

  showReport(){
    this.dataReport.setList(this.nearCountries);
    this.router.navigate(['/reports']);
  }

  tooglePanel(){
    this.open = !this.open; 
  }

  showModal(){
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '350px',
      data: {nearCountries: this.nearCountries}
    });
  }

}
