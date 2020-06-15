import { Component, OnInit } from '@angular/core';
import { CountriesServices } from 'src/app/services/countries.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { AuthService } from 'src/app/services/auth.service';
import { DataReportService } from 'src/app/services/dataReport.service';
import { CountriesListModel } from 'src/app/model/countriesList.model';

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

  public cantCountries: any;
  private currentLocation: any;
  constructor(private countriesServices: CountriesServices, public authService : AuthService,
    private router: Router,public dialog: MatDialog, private dataReport : DataReportService) { }

  ngOnInit(): void {
    let cantidadPaises = 5;
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(data => {
        this.cantCountries = Array.from(Array(10).keys());
        this.currentLocation = data.coords;
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

  updateNearCountries(cant){
    this.countriesServices.findNearCountries(this.currentLocation.latitude, this.currentLocation.longitude, cant.toString()).subscribe(data => {
      this.enableLocation = true;
      this.nearCountries = data;
    }, error => {
      console.log(error);
      this.enableLocation = false;
    });
  }

  showReport(){
    let nearCountriesList = new CountriesListModel();
    nearCountriesList.name = "Paises cercanos a tu ubicación";
    nearCountriesList.countries = this.nearCountries;
    this.dataReport.setList(nearCountriesList);
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
