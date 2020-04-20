import { Component, OnInit } from '@angular/core';
import { CountriesServices } from 'src/app/services/countries.service';
import { isRegExp } from 'util';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.scss']
})
export class CountriesComponent implements OnInit {
  allCountries : any;

  constructor(private countriesService : CountriesServices) { }

  ngOnInit(): void {
  }

  findAll(){
    this.countriesService.findAll().subscribe(response =>{
      if(response != null){
        this.allCountries = response;
      }
    });
  }

  clear(){
    this.allCountries = null;
  }
}
