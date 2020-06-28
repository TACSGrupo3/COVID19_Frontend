import { Component, OnInit } from '@angular/core';
import { UserModel } from 'src/app/model/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

import { AngularFireAuth } from "@angular/fire/auth";
import { auth } from 'firebase/app';
import { NgxSpinnerService } from 'ngx-spinner';

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
    private _snackBar: MatSnackBar, public afAuth: AngularFireAuth, private spinnerService: NgxSpinnerService) { }
  durationInSeconds = 5;

  ngOnInit(): void {
    if (this.authService.isTokenAvaible()) {
      this.router.navigate(['home']);
    }
    this.spinnerService.hide();
  }

  onLogin() {
    return this.authService.loginUser(this.user).subscribe(data => {
      this.authService.setAdminFlag(data);
      this.authService.setTitle(data.firstName);

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
          let snackBarRef = this._snackBar.open(error.error.message, null,
            { duration: 3000 });
        }
      });
  }

  onFacebookLogin() {
    this.afAuth.signInWithPopup(new auth.FacebookAuthProvider())
      .then(credential => {
        this.authService.loginUserWithFacebook(credential).subscribe(data => {
          this.router.navigate(['home']);
          this.authService.loggedWithGoogle = true;
          this.authService.setAdminFlag(null);
          this.authService.setTitle(data.firstName);

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
            let snackBarRef = this._snackBar.open(error.error.message, null,
              { duration: 3000 });
          }
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
      });
  }

  onGithubLogin() {
    this.afAuth.signInWithPopup(new auth.GithubAuthProvider())
      .then(credential => {
        this.authService.loginUserWithGitHub(credential).subscribe(data => {
          this.router.navigate(['home']);
          this.authService.loggedWithGoogle = true;
          this.authService.setAdminFlag(null);
          this.authService.setTitle(data.firstName);

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
      });
  }

  onGoogleLogin() {
    this.afAuth.signInWithPopup(new auth.GoogleAuthProvider()).then(credentials => {
      this.authService.loginUserWithGoogle(credentials).subscribe(data => {
        this.router.navigate(['home']);
        this.authService.loggedWithGoogle = true;
        this.authService.setAdminFlag(null);
        this.authService.setTitle(data.firstName);

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
    });

  }



}
