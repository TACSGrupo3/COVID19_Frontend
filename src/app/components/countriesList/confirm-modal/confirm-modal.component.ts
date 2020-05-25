import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogComponent } from '../../dialog/dialog.component';
import { ConfirmDialog } from '../new-countries-list/new-countries-list.component';

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.scss']
})
export class ConfirmModalComponent implements OnInit {

  public message: string;

  public isConfirm: boolean = false;
  public isDelete: boolean = false;
  public isEdit: boolean = false;
  
  constructor(public router: Router,
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ConfirmDialog) { }


  ngOnInit(): void {
    this.message = this.data.message;

    switch(this.data.type){
      case "confirm":
        this.isConfirm = true;
        break;
      case "delete":
        this.isDelete = true;
        break;
      case "edit":
        this.isEdit = true;
        break;
    }
  }

  newList() {
    this.router.navigate(['/newCountriesList']);
    this.dialogRef.close();
  }

  viewLists() {
    this.router.navigate(['/countriesList']);
    this.dialogRef.close();
  }

  closeModal(){
    this.dialogRef.close(); 
  }

  deleteList(){
    this.data.isDeleted = true;
    this.dialogRef.close();
  }
}
