import { Component, OnInit } from '@angular/core';
import { CountriesServices } from 'src/app/services/countries.service';
import { AdminService } from 'src/app/services/admin.service';
import { CountriesListModel } from 'src/app/model/countriesList.model';
import { FormControl } from '@angular/forms';
import { Observable, fromEvent } from 'rxjs';
import { map, startWith, debounceTime } from 'rxjs/operators';
import { CountryModel } from 'src/app/model/country.model';

@Component({
  selector: 'app-common-countries',
  templateUrl: './common-countries.component.html',
  styleUrls: ['./common-countries.component.scss']
})
export class CommonCountriesComponent implements OnInit {
  constructor(private adminService: AdminService) { }
  
  countriesList: Array<CountriesListModel> = new Array<CountriesListModel>();
  myControl = new FormControl();
  myControl2 = new FormControl();
  filteredOptions: Observable<Array<CountriesListModel>>;
  filteredOptions2: Observable<Array<CountriesListModel>>;
  listA: CountriesListModel;
  listB: CountriesListModel;
  listIntersected: Array<CountryModel>;
  listAOption: String;
  listBOption: String;


  myControlMobile = new FormControl();
  myControl2Mobile = new FormControl();
  filteredOptionsMobile: Observable<Array<CountriesListModel>>;
  filteredOptions2Mobile: Observable<Array<CountriesListModel>>;
  listAMobile: CountriesListModel;
  listBMobile: CountriesListModel;
  listIntersectedMobile: Array<CountryModel>;
  listAOptionMobile: String;
  listBOptionMobile: String;

  ngOnInit(): void {
 
    this.adminService.getCountriesLists().subscribe(data => {
      this.countriesList = data;
    });

    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
    this.filteredOptions2 = this.myControl2.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
  }

  private _filter(value: any): Array<CountriesListModel> {
    let filterValue: string;
    if (value.name == null) {
      filterValue = value.toLowerCase();
    } else {
      filterValue = value.name.toLowerCase();
    }
    return this.countriesList.filter(option => option.name.toLowerCase().includes(filterValue));
  }

  selectListA(list) {
    if (list != null) {
      console.log("OPTION: ", this.listAOption);
      this.listA = list;
      this.calculateIntersection();
    } else {
      console.log(list);
    }

  }

  changeInput() {
    if (this.listAOption == '') {
      this.listA = null;
      this.listIntersected = null;
    }
    if (this.listBOption == '')
      this.listB == null;
    this.listIntersected = null;
  }
  selectListB(list) {
    this.listB = list;
    this.calculateIntersection();
  }

  calculateIntersection() {
    if (this.listA != null && this.listB != null) {

      this.listIntersected = this.listA.countries.filter(a =>
        this.listB.countries.some(b => a.id === b.id));;
    }
  }
  displayFn(countriesList: CountriesListModel): string {
    return countriesList && countriesList.name ? countriesList.name : '';
  }

}
