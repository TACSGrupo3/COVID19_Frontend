import { Component, OnInit } from '@angular/core';
import { CountriesListModel } from 'src/app/model/countriesList.model';
import { CountryModel } from 'src/app/model/country.model';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { CountriesServices } from 'src/app/services/countries.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmModalComponent } from '../confirm-modal/confirm-modal.component';

declare var $: any;

export interface ConfirmDialog {
  message: any;
  type: string;

  isDeleted : boolean;
}

@Component({
  selector: 'app-new-countries-list',
  templateUrl: './new-countries-list.component.html',
  styleUrls: ['./new-countries-list.component.scss']
})
export class NewCountriesListComponent implements OnInit {

  formGroup: FormGroup;
  countries: Array<CountryModel>;
  countryToAdd: any;
  formatDualList: any;
  isValid: boolean = false;

  isSaved: boolean = false;

  countriesList: CountriesListModel;

  constructor(private authService: AuthService, private countriesService: CountriesServices,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.countriesList = new CountriesListModel();
    this.formatDualList = {
      add: 'Agregar', remove: 'Quitar', all: 'Todos', none: 'Ninguno',
      direction: 'left-to-right', draggable: true, locale: undefined
    };
    this.formGroup = new FormGroup({
      'nameList': new FormControl(this.countriesList.name),
      'countriesList': new FormControl(this.countriesList.countries)
    });
    this.findAll();
  }

  ngAfterViewInit() {

    $("input[name=filterSource]").attr("placeholder", "Ingresá el país a buscar...");
    $("input[name=filterDestination]").attr("placeholder", "Ingresá el país a buscar...");
  }

  findAll() {
    this.countriesService.findAll().subscribe(response => {
      if (response != null) {
        this.countries = response;
      }
    });
  }

  addCountry() {
    let countryToAdd = this.formGroup.get('countryToAdd').value;
    this.countriesList.countries.push(countryToAdd);

    this.countries = this.countries.filter(country => {
      return country.id != countryToAdd.id;
    });

    this.formGroup.get('countryToAdd').setValue('');
  }

  getDisplayCountryName() {
    return (country: CountryModel) => this.getNameCountry(country);
  }

  public getNameCountry(country: CountryModel) {
    return country.name;
  }

  deleteCountry(index: number) {
    let country: Array<CountryModel> = this.countriesList.countries.splice(index, 1);

    this.countries.push(country[0]);
    this.countries.sort(function (a, b) {
      if (a.name > b.name) {
        return 1;
      } else if (a.name < b.name) {
        return -1;
      } else {
        return 0;
      }
    });

    console.log(this.countries);
  }

  isValidName() {
    this.isValid = this.countriesList.name != '';
  }

  updateNameList() {
    this.countriesList.name = this.formGroup.get("nameList").value;
  }

  save() {
    if (this.isSaved) {
      let lists: Array<CountriesListModel> = new Array<CountriesListModel>();
      lists.push(this.countriesList);
      this.countriesService.addCountriesList(this.authService.getUserId().toString(), lists)
        .subscribe(data => {
          this.isSaved = true;
          this.showModal();
        })
    }else{
      this.showModal();
    }
  }

  showModal() {
    const dialogRef = this.dialog.open(ConfirmModalComponent, {
      width: '500px',
      height: '500px',
      data: { message: "Se ha creado la lista con éxito!", type:"confirm"}
    });

  }


}