import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogComponent } from '../../dialog/dialog.component';
import { UserDialog } from '../user-data.component';
import { UserModel } from 'src/app/model/user.model';


@Component({
  selector: 'app-user-data',
  templateUrl: './user-data-view.component.html',
  styleUrls: ['./user-data-view.component.scss']
})
export class UserModalComponent implements OnInit {

  public user: UserModel;
  
  constructor(public router: Router,
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: UserDialog) { }


  ngOnInit(): void {
    this.user = this.data.user;
  }

  closeModal(){
    this.dialogRef.close(); 
  }

}
