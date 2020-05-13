import { Component, OnInit, ɵConsole } from '@angular/core';
import { CountriesServices } from 'src/app/services/countries.service';
import { FormGroup, FormControl } from '@angular/forms';
import { CountryModel } from 'src/app/model/country.model';
import { CountriesListModel } from 'src/app/model/countriesList.model';
import { AuthService } from 'src/app/services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmModalComponent } from './confirm-modal/confirm-modal.component';


@Component({
  selector: 'app-countriesList',
  templateUrl: './countriesList.component.html',
  styleUrls: ['./countriesList.component.scss']
})
export class CountriesListComponent implements OnInit {
  displayedColumns: string[] = ['name', 'cant', 'report', 'edit', 'delete'];
  countriesList: Array<CountriesListModel> = new Array<CountriesListModel>();

  constructor(private authService: AuthService, private countriesService: CountriesServices,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getCountriesListsOfUser();
  }

  getCountriesListsOfUser() {
    this.countriesService.getCountriesListOfUser(this.authService.getCurrentUser()).subscribe(response => {
      if (response != null) {
        this.countriesList = response;
        console.log(this.countriesList);
      }
    });
  }

  deleteList(list : any){
    this.countriesService.deleteCountriesList(list.id);

    const dialogRef = this.dialog.open(ConfirmModalComponent, {
      width: '500px',
      height: '500px',
      data: { message: "Está seguro que desea eliminar la lista?" , type: "delete"}
    });

    
    dialogRef.afterClosed().subscribe( element => {
      let isDeleted = dialogRef.componentInstance.data.isDeleted;

      if(isDeleted){
        this.countriesService.deleteCountriesList(list.id).subscribe(data =>{
          console.log("Se eliminó la lista");
          let index = this.countriesList.findIndex(element => element.id == list.id);
          console.log("INDEX: ", index);
          console.log("Lista Antes:", this.countriesList);
          this.countriesList = this.countriesList.splice(index,0);
          console.log("Lista Despues:", this.countriesList);
        });
      }
    });
  }
}
