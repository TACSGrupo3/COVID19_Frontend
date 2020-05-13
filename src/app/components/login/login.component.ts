import { Component, OnInit } from '@angular/core';
import { UserModel } from 'src/app/model/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

import { AngularFireAuth } from "@angular/fire/auth";
import { auth } from 'firebase/app';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public user: UserModel = new UserModel();
  public error: String = "";
  public hide = true;
  constructor(private authService: AuthService, private router: Router,
    private _snackBar: MatSnackBar, public afAuth: AngularFireAuth) { }
  durationInSeconds = 5;

  ngOnInit(): void {
    if (this.authService.isTokenAvaible()) {
      this.router.navigate(['home']);
    }
  }

  onLogin() {
    return this.authService.loginUser(this.user).subscribe(data => {
      this.setAdminFlag(data);
      this.setTitle(data.firstName);

      this.authService.setUser(data);
      this.authService.setToken(data.token);
      this.router.navigate(['home']);
    },
      error => {
        if (error.status == 0) {
          let snackBarRef = this._snackBar.
            open("Ocurrió un problema en el servidor. Intenté nuevamente en unos minutos.", null,
              { duration: 3000 });
        } else if (error.status == 404) {
          let snackBarRef = this._snackBar.open("Http Url Not Found.", null,
            { duration: 3000 });
        } else if (error.status == 504) {
          let snackBarRef = this._snackBar.open("Ocurrió un problema en el servidor. Intenté nuevamente en unos minutos.", null,
            { duration: 3000 });
        } else {
          // Simple message.
          let snackBarRef = this._snackBar.open(error.error, null,
            { duration: 3000 });
        }
        console.log(this.error);
      });
  }

  onFacebookLogin() {
    this.afAuth.signInWithPopup(new auth.FacebookAuthProvider())
      .then(credential => {
        this.authService.loginUserWithSocial(credential).subscribe(data => {
          this.router.navigate(['home']);
          this.authService.loggedWithGoogle = true;
          this.setAdminFlag(null);
          this.setTitle(data.firstName);

          this.authService.setUser(data);
          this.authService.setToken(data.token);
        }, error => {
          if (error.status == 0) {
            let snackBarRef = this._snackBar.
              open("Ocurrió un problema en el servidor. Intenté nuevamente en unos minutos.", null,
                { duration: 3000 });
          } else if (error.status == 404) {
            let snackBarRef = this._snackBar.open("Http Url Not Found.", null,
              { duration: 3000 });
          } else {
            // Simple message.
            let snackBarRef = this._snackBar.open(error.error, null,
              { duration: 3000 });
          }
          console.log(this.error);
        });
      }, error => {
        if (error.code == "auth/account-exists-with-different-credential") {
          let snackBarRef = this._snackBar.
            open("Ya existe una cuenta con el mismo email pero creada con otra aplicación.", null,
              { duration: 3000 });
        } else {
          let snackBarRef = this._snackBar.
            open(error.message, null,
              { duration: 3000 });
        }
        console.log("ERROR: ", error);
      });
  }

  onLinkedinGithub() {
    this.afAuth.signInWithPopup(new auth.GithubAuthProvider())
      .then(credential => {
        this.authService.loginUserWithSocial(credential).subscribe(data => {
          this.router.navigate(['home']);
          this.authService.loggedWithGoogle = true;
          this.setAdminFlag(null);
          this.setTitle(data.firstName);

          this.authService.setUser(data);
          this.authService.setToken(data.token);
        }, error => {
          if (error.status == 0) {
            let snackBarRef = this._snackBar.
              open("Ocurrió un problema en el servidor. Intenté nuevamente en unos minutos.", null,
                { duration: 3000 });
          } else if (error.status == 404) {
            let snackBarRef = this._snackBar.open("Http Url Not Found.", null,
              { duration: 3000 });
          } else if (error.status == 504) {
            let snackBarRef = this._snackBar.open("Ocurrió un problema en el servidor. Intenté nuevamente en unos minutos.", null,
              { duration: 3000 });
          } else {
            // Simple message.
            let snackBarRef = this._snackBar.open(error.error, null,
              { duration: 3000 });
          }
          console.log(this.error);
        });
      }, error => {
        if (error.code == "auth/account-exists-with-different-credential") {
          let snackBarRef = this._snackBar.
            open("Ya existe una cuenta con el mismo email pero creada con otra aplicación.", null,
              { duration: 3000 });
        } else {
          let snackBarRef = this._snackBar.
            open(error.message, null,
              { duration: 3000 });
        }
        console.log("ERROR: ", error);
      });
  }

  onGoogleLogin() {
    this.afAuth.signInWithPopup(new auth.GoogleAuthProvider()).then(credentials => {
      this.authService.loginUserWithSocial(credentials).subscribe(data => {
        this.router.navigate(['home']);
        this.authService.loggedWithGoogle = true;
        this.setAdminFlag(null);
        this.setTitle(data.firstName);

        this.authService.setUser(data);
        this.authService.setToken(data.token);
      }, error => {
        if (error.status == 0 || error.status == 504) {
          let snackBarRef = this._snackBar.
            open("Ocurrió un problema en el servidor. Intenté nuevamente en unos minutos.", null,
              { duration: 3000 });
        } else if (error.status == 404) {
          let snackBarRef = this._snackBar.open("Http Url Not Found.", null,
            { duration: 3000 });
        } else if (error.status == 504) {
          let snackBarRef = this._snackBar.open("Ocurrió un problema en el servidor. Intenté nuevamente en unos minutos.", null,
            { duration: 3000 });
        } else {
          // Simple message.
          let snackBarRef = this._snackBar.open(error.error, null,
            { duration: 3000 });
        }
        console.log(this.error);
      });
    }, error => {
      if (error.code == "auth/account-exists-with-different-credential") {
        let snackBarRef = this._snackBar.
          open("Ya existe una cuenta con el mismo email pero creada con otra aplicación.", null,
            { duration: 3000 });
      } else {
        let snackBarRef = this._snackBar.
          open(error.message, null,
            { duration: 3000 });
      }
      console.log("ERROR: ", error);
    });

  }

  setAdminFlag(data: any) {
    if (data != null && data.username != null &&
      data.username.toLowerCase() == "admin") { //Todo: Manejar con roles
      this.authService.isAdmin = true;
    } else {
      this.authService.isAdmin = false;
    }
  }

  setTitle(firstName: any) {
    if (firstName != null) {
      this.authService.setTitle(firstName);
    } else {
      this.authService.setTitle(null);
    }
  }
}
