import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { UserModel } from 'src/app/model/user.model';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(private authService: AuthService,
    private router: Router) { }

  public user: UserModel = new UserModel();
  
  ngOnInit(): void {
  }

  onRegister() : void{
    this.authService.registration(this.user).subscribe(user =>{
      this.authService.loginUser(this.user).subscribe(userLoged =>{
        this.authService.setAdminFlag(userLoged);
        this.authService.setTitle(userLoged.firstName);
  
        this.authService.setUser(userLoged);
        this.authService.setToken(userLoged.token);
        this.router.navigate(['home']);
      });
    }),
    error => {
      console.log(error);
    };
  }

}
