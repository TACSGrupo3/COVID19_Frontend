import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { UserModel } from 'src/app/model/user.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user: UserModel = new UserModel();
  constructor(private authService : AuthService,private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.user = this.authService.getCurrentUser();
    this.user.password = "";
  }

  save(){
      this.authService.updateUser(this.user).subscribe(data =>{
        this.user = data;
        this.authService.setUser(this.user);
        let snackBarRef = this._snackBar.open("Se guardó el usuario con éxito", null,
            { duration: 3000 });
      }, error=>{
        let snackBarRef = this._snackBar.open("Ocurrió un problema al actualizar los datos.", null,
            { duration: 3000 });
      });
  }

}
