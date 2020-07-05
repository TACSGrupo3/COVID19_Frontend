import { Component, OnInit, ViewChild } from '@angular/core';
import { CountriesListModel } from 'src/app/model/countriesList.model';
import { CountryModel } from 'src/app/model/country.model';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { CountriesServices } from 'src/app/services/countries.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmModalComponent } from '../confirm-modal/confirm-modal.component';
import { ActivatedRoute, Router } from '@angular/router';
import { UserModel } from 'src/app/model/user.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatStepper } from '@angular/material/stepper';

declare var $: any;

export interface ConfirmDialog {
  message: any;
  type: string;

  newList: boolean;
  isDeleted: boolean;
}

@Component({
  selector: 'app-new-countries-list',
  templateUrl: './new-countries-list.component.html',
  styleUrls: ['./new-countries-list.component.scss']
})
export class NewCountriesListComponent implements OnInit {
  @ViewChild('stepper') stepper: MatStepper;
  formGroup: FormGroup;
  countries: Array<CountryModel>;
  countryToAdd: any;
  formatDualList: any;
  isValid: boolean = false;

  isSaved: boolean = false;
  listToModify: CountriesListModel;
  countriesList: CountriesListModel;

  error: String;

  mode: number = 0;

  constructor(private authService: AuthService, private countriesService: CountriesServices,
    public dialog: MatDialog, private router: Router, private _snackBar: MatSnackBar,
    private spinnerService: NgxSpinnerService) {
    if (this.router.getCurrentNavigation().extras.state != null &&
      this.router.getCurrentNavigation().extras.state.data != null)
      this.listToModify = this.router.getCurrentNavigation().extras.state.data.list;
  }

  ngOnInit(): void {
    this.spinnerService.show();
   
    this.isValid = false;
    this.countriesList = new CountriesListModel();
    this.formatDualList = {
      add: 'Agregar', remove: 'Quitar', all: 'Todos', none: 'Ninguno',
      direction: 'left-to-right', draggable: true, locale: undefined
    };
    this.formGroup = new FormGroup({
      'nameList': new FormControl(this.countriesList.name),
      'countriesList': new FormControl(this.countriesList.countries)
    });

    if (this.listToModify) {
      this.loadEntity();
    }
    this.findAll();
  }

  loadEntity() {
    this.mode = 1;
    this.countriesList = this.listToModify;
    this.formGroup.get("nameList").setValue(this.countriesList.name);
    this.isValid = true;
  }

  ngAfterViewInit() {
    $("input[name=filterSource]").attr("placeholder", "Ingresá el país a buscar...");
    $("input[name=filterDestination]").attr("placeholder", "Ingresá el país a buscar...");
  }

  findAll() {
    this.countriesService.findAll().subscribe(response => {
      if (response != null) {
        this.countries = response;
        this.spinnerService.hide();
      }
    });
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
  }

  isValidName() {
    this.isValid = this.countriesList.name != '';
  }

  updateNameList() {
    this.countriesList.name = this.formGroup.get("nameList").value;
  }

  save() {

    if (this.mode == 0) {
      let lists: Array<CountriesListModel> = new Array<CountriesListModel>();
      lists.push(this.countriesList);
      this.countriesService.addCountriesList(this.authService.getUserId().toString(), lists)
        .subscribe(data => {
          this.isSaved = true;
          this.showModal();
        }, error => {
          let snackBarRef = this._snackBar.open(error.error.message, null,
            { duration: 5000 });
        });
    } else {
      this.countriesService.modifyCountriesList(this.countriesList)
        .subscribe(data => {
          this.isSaved = true;
          this.showModal();
        }, error => {
          let snackBarRef = this._snackBar.open(error.error.message, null,
            { duration: 5000 });
        });
    }
  }

  showModal() {
    if (this.mode == 0) {
      const dialogRef = this.dialog.open(ConfirmModalComponent, {
        width: '500px',
        height: '500px',
        data: { message: "Se ha creado la lista con éxito!", type: "confirm" }
      });

      dialogRef.afterClosed().subscribe(data =>{
        let newList = dialogRef.componentInstance.data.newList;
        if(newList){
          this.ngOnInit();
          this.stepper.selectedIndex = 0;
        }
      });
    } else {
      const dialogRef = this.dialog.open(ConfirmModalComponent, {
        width: '500px',
        height: '500px',
        data: { message: "Se ha modificado la lista con éxito!", type: "edit" }
      });
    }
  }


}
