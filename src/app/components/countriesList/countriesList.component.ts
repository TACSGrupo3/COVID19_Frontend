import { Component, OnInit, ɵConsole } from '@angular/core';
import { CountriesServices } from 'src/app/services/countries.service';
import { FormGroup, FormControl } from '@angular/forms';
import { CountryModel } from 'src/app/model/country.model';
import { CountriesListModel } from 'src/app/model/countriesList.model';
import { AuthService } from 'src/app/services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmModalComponent } from './confirm-modal/confirm-modal.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { DataReportService } from 'src/app/services/dataReport.service';


@Component({
  selector: 'app-countriesList',
  templateUrl: './countriesList.component.html',
  styleUrls: ['./countriesList.component.scss']
})
export class CountriesListComponent implements OnInit {
  isLoading : boolean = true;
  displayedColumns: string[] = ['name', 'cant', 'report', 'edit', 'delete'];
  countriesList: Array<CountriesListModel> = new Array<CountriesListModel>();

  constructor(private authService: AuthService, private countriesService: CountriesServices,
    public dialog: MatDialog,private spinnerService : NgxSpinnerService, private router : Router,
    private dataReportService : DataReportService) { }

  ngOnInit(): void {
    this.spinnerService.show();
    this.getCountriesListsOfUser();
  }

  getCountriesListsOfUser() {
    this.countriesService.getCountriesListOfUser(this.authService.getCurrentUser()).subscribe(response => {
      if (response) {
        this.countriesList = response;
        setTimeout(() =>{
          this.isLoading = false;
          this.spinnerService.hide();
        }, 2000);
      }
    });
  }

  viewReport(list: any){
    this.dataReportService.setList(list);
    this.router.navigate(['/reports']);
  }

  modifyList(list: any){
      this.router.navigate(['/newCountriesList'], {state: {data: {list}}});
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
          let index = this.countriesList.findIndex(element => element.id == list.id);
          this.countriesList.splice(index,1);
        });
      }
    });
  }
}
