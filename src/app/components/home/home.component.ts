import { Component, OnInit } from '@angular/core';
import { CountriesServices } from 'src/app/services/countries.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public nearCountries: any;
  public enableLocation : boolean = false;

  constructor(private countriesServices: CountriesServices) { }

  ngOnInit(): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(data => {
        this.countriesServices.findNearCountries(data.coords.latitude, data.coords.longitude).subscribe(data => {
          this.enableLocation = true;
          this.nearCountries = data;
          console.log(data);
        }, error => {
          console.log(error);
          this.enableLocation = false;
        });
      });
    }
  }
}
