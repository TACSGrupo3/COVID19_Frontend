import { Component, OnInit } from '@angular/core';
import { CountriesServices } from 'src/app/services/countries.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public nearCountries: any;
  public enableLocation : boolean = false;

  constructor(private countriesServices: CountriesServices,
    private router: Router) { }

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

  showReport(){
    this.router.navigate(['/reports', { id: 1 }]);
  }

  openMenu(menu: any){
    console.log(menu);
  }
}
