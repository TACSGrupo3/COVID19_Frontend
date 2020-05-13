import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from '../home/home.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {
  public nearCountries: any;

  constructor( public router: Router,
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  closeModal(){
    this.dialogRef.close();
  }

  ngOnInit(): void {
    this.nearCountries = this.data.nearCountries;
  }

  showReport(){
    this.router.navigate(['/reports', { id: 1 }]);
    this.dialogRef.close();
  }
  

}
