import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {UserModel} from '../model/user.model';
import {isNullOrUndefined} from 'util';
import {AngularFireAuth} from '@angular/fire/auth';
import {DatePipe} from '@angular/common';
import {CountriesServices} from "./countries.service";

@Injectable()
export class AuthService {
  static getToken() {
    let token = localStorage.getItem("accessToken");
    if (!isNullOrUndefined(token)) {
      return token;
    } else {
      return null;
    }
  }

  readonly SERVIDOR_API: string = "/api/";
  public isAdmin: boolean = false;
  public titleName: String = "a Covid19";

  public loggedWithGoogle: boolean = false;

  constructor(private http: HttpClient, public afAuth: AngularFireAuth, public datepipe: DatePipe, private CountriesServices: CountriesServices) {
  }

  postRequest(servicio: string, body: any): Observable<any> {
    var url: string;
    url = this.SERVIDOR_API + servicio;
    let myHeaders: HttpHeaders = new HttpHeaders();
    let options = {headers: myHeaders};

    return this.http.post(url, body, options);
  }

  paramsString(params: Array<any>) {
    return params && params.join ? params.join("&") : "";
  }

  registration(user: UserModel) {
    return this.postRequest("users", user);
  }

  loginUser(user: UserModel): Observable<any> {
    var url: string;
    url = `${this.SERVIDOR_API}session`;
    let myHeaders: HttpHeaders = new HttpHeaders();
    let options = {headers: myHeaders};

    return this.http.post(url, user, options);
  }

  loginUserWithFacebook(data: any): Observable<any> {
    let user: UserModel = new UserModel();
    user.firstName = data.additionalUserInfo.profile.first_name;
    user.lastName = data.additionalUserInfo.profile.last_name;
    user.username = data.user.email;
    user.password = data.user.uid;
    var url: string;
    url = `${this.SERVIDOR_API}sessionWithSocial`;
    let myHeaders: HttpHeaders = new HttpHeaders();
    let options = {headers: myHeaders};

    return this.http.post(url, user, options);
  }

  loginUserWithGitHub(data: any): Observable<any> {
    let user: UserModel = new UserModel();
    user.firstName = data.additionalUserInfo.profile.name;
    user.lastName = " ";
    user.username = data.user.email;
    user.password = data.user.uid;
    var url: string;
    url = `${this.SERVIDOR_API}sessionWithSocial`;
    let myHeaders: HttpHeaders = new HttpHeaders();
    let options = {headers: myHeaders};

    return this.http.post(url, user, options);
  }


  loginUserWithGoogle(data: any): Observable<any> {
    let user: UserModel = new UserModel();
    user.firstName = data.additionalUserInfo.profile.given_name;
    user.lastName = data.additionalUserInfo.profile.family_name;
    user.username = data.user.email;
    user.password = data.user.uid;
    var url: string;
    url = `${this.SERVIDOR_API}sessionWithSocial`;
    let myHeaders: HttpHeaders = new HttpHeaders();
    let options = {headers: myHeaders};

    return this.http.post(url, user, options);
  }

  logoutUser() {
    //Enviar servicio logout
    localStorage.removeItem("currentUser");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("reportList");
    this.CountriesServices.cache$ = null;
    if (this.loggedWithGoogle) {
      this.afAuth.signOut();
    }
  }

  setUser(user: UserModel): void {
    if (user) {
      let user_string = JSON.stringify(user);
      localStorage.setItem("currentUser", user_string);
    } else {
      localStorage.clear();
    }

  }

  setToken(token): void {
    localStorage.setItem("accessToken", token);
  }

  cleanLocalStorage() {
    this.setUser(null);
    this.logoutUser();
  }

  //MANEJO DEL TOKEN

  getToken() {
    let token = localStorage.getItem("accessToken");
    if (!isNullOrUndefined(token)) {
      return token;
    } else {
      return null;
    }
  }

  getCurrentUser() {
    let user_string = localStorage.getItem("currentUser");
    if (!isNullOrUndefined(user_string)) {
      let user = JSON.parse(user_string);
      if (user.userRole === "ADMIN") {
        this.isAdmin = true;
      } else {
        this.isAdmin = false;
      }
      return user;
    } else {
      return null;
    }
  }

  getUserId() {
    let user: UserModel = this.getCurrentUser();
    if (user) return user.id;
  }

  isTokenAvaible() {
    if (this.getToken() && this.getCurrentUser())
      return true;
    return false;
  }

  setAdminFlag(data: any) {
    if (data?.username && data.userRole == "ADMIN") {
      this.isAdmin = true;
    } else {
      this.isAdmin = false;
    }
  }

  setTitle(title: any) {
    if (!title)
      this.titleName = "a Covid19"
    else
      this.titleName = title;
  }

  updateUser(user: UserModel): Observable<any> {
    var url: string;
    url = `${this.SERVIDOR_API}users/${user.id}`;
    let myHeaders: HttpHeaders = new HttpHeaders();
    let options = {headers: myHeaders};

    return this.http.patch(url, user, options);
  }

  getLastAccess() {
    let user = this.getCurrentUser();

    if (user) {
      return this.datepipe.transform(user.lastAccess, 'dd/MM/yyyy, h:mm:ss a');
    } else {
      return "";
    }
  }
}

