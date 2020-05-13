import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router : Router){

  }
  
  canActivate(){
    let user = this.authService.getCurrentUser()
    if(user){
      //login true
      this.authService.setTitle(user.firstName);
      return true;
    }else{
      this.router.navigate(['/login']);
      this.authService.cleanLocalStorage();
      return false;
    }
  }
  
}
