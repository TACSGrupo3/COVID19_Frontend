import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserModel } from '../model/user.model';
import { isNullOrUndefined } from 'util';
import { AngularFireAuth } from '@angular/fire/auth';

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
    constructor(private http: HttpClient, public afAuth: AngularFireAuth) { }

    setTitle(title: any) {
        if (title == null)
            this.titleName = "a Covid19"
        else
            this.titleName = title;
    }

    getRequest(servicio: string, params: Array<any>): Observable<any> {
        var url: string;
        let paramsString = this.paramsString(params);
        url = this.SERVIDOR_API + servicio + "/" + paramsString;

        return this.http.get(url);

    }

    postRequest(servicio: string, body: any): Observable<any> {
        var url: string;
        url = this.SERVIDOR_API + servicio;
        let myHeaders: HttpHeaders = new HttpHeaders();
        let options = { headers: myHeaders };

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
        url = this.SERVIDOR_API + "session";
        let myHeaders: HttpHeaders = new HttpHeaders();
        let options = { headers: myHeaders };

        return this.http.post(url, user, options);
    }

    loginUserWithSocial(data: any): Observable<any> {
        let user: UserModel = new UserModel();
        user.firstName = data.user.displayName;
        user.username = data.user.email;
        var url: string;
        url = this.SERVIDOR_API + "sessionWithSocial";
        let myHeaders: HttpHeaders = new HttpHeaders();
        let options = { headers: myHeaders };

        return this.http.post(url, user, options);
    }

    logoutUser() {
        //Enviar servicio logout
        localStorage.removeItem("currentUser");
        localStorage.removeItem("accessToken");

        if (this.loggedWithGoogle) {
            this.afAuth.signOut();
        }
    }

    setUser(user: UserModel): void {
        if (user != null) {
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
        if (user != null) return user.id;
    }

    isTokenAvaible() {
        if (this.getToken() != null && this.getCurrentUser() != null)
            return true;
        return false;
    }

}

