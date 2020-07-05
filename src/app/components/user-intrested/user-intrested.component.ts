import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { CountryModel } from 'src/app/model/country.model';
import { Observable } from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { AdminService } from 'src/app/services/admin.service';
import { CountriesServices } from 'src/app/services/countries.service';
import { UserModel } from 'src/app/model/user.model';
import { MatDialog } from '@angular/material/dialog';
import { UserModalComponent } from '../user-data/user-data-view/user-data-view.component';

@Component({
  selector: 'app-user-intrested',
  templateUrl: './user-intrested.component.html',
  styleUrls: ['./user-intrested.component.scss']
})
export class UserIntrestedComponent implements OnInit {
  myControl = new FormControl();
  countriesList: Array<CountryModel>;
  filteredOptions: Observable<Array<CountryModel>>;
  countrySelected: CountryModel;
  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'username', 'view'];

  usersIntrested: Array<UserModel>;

  constructor(private adminService: AdminService, private countriesService : CountriesServices, 
    public dialog: MatDialog) { }
  
  ngOnInit(): void {

    this.countriesService.findAll().subscribe(data =>{
      this.countriesList = data;

      this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
    });

   
  }

  private _filter(value: any): Array<CountryModel> {
    let filterValue = "";
    if(value != null ){
      if(value.name == null)
        filterValue = value.toLowerCase();
      else 
        filterValue = value.name.toLowerCase();
      }
    return this.countriesList.filter(option => option.name.toLowerCase().includes(filterValue));
  }

  displayFn(country: CountryModel): String {
    return country && country.name ? country.name : '';
  }

  selectCountry(){
    this.adminService.getUserIntrested(this.countrySelected.idCountry).subscribe(data =>{
      this.usersIntrested = data;
    });
    
  }

  clearInput(){
   this.countrySelected = new CountryModel(); 
   this.usersIntrested = null;
   this.myControl.reset();
  }

  viewUserData(element) {

    this.adminService.getUser(element.id).subscribe(data => {
      const dialogRef = this.dialog.open(UserModalComponent, {
        width: '500px',
        height: '500px',
        data: { user: data }
      });
    });
  }
}
