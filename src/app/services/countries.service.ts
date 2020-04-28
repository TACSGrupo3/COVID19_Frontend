import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserModel } from '../model/user.model';

@Injectable()
export class CountriesServices {
    readonly SERVIDOR_API: string = "/api/";
    
    constructor(private http: HttpClient) { }

    private getRequest(servicio: string, params: any, queryParams: Array<any>): Observable<any> {
        var url: string;
        let paramsString = this.paramsString(params, queryParams);
        url = this.SERVIDOR_API + servicio + "/" + paramsString;

        return this.http.get(url);

    }
    
    postRequest(servicio: string, body: any) : Observable<any> {
        var url: string;
        url = this.SERVIDOR_API + servicio;
        let myHeaders: HttpHeaders = new HttpHeaders();
        let options = { headers : myHeaders };
        
        return this.http.post(url, body,options);
    }

    patchRequest(servicio: string, body: any, idToModify : any) : Observable<any> {
        var url: string;
        url = this.SERVIDOR_API + servicio + "/" + idToModify;
        let myHeaders: HttpHeaders = new HttpHeaders();
        let options = { headers : myHeaders };
        
        return this.http.patch(url, body,options);
    }

    private paramsString(params: any, queryParams: Array<any>) {
        if (params == null) params = "";
        if (queryParams != null) {
            for (let i = 0; i < queryParams.length; i++) {
                if (i == 0) {
                    params = params.toString().concat("?");
                } else {
                    params = params.toString().concat("&")
                }
                params = params.toString().concat(queryParams[i].toString());
            }
        }
        return params;
    }

    findAll() {
        return this.getRequest("countries", null, null);
    }

    findNearCountries(latitud : any, longitud : any){
        return this.getRequest("countries", null, ["latitud="+latitud,"longitud="+longitud]);
    }

    getCountriesList(){
        return this.getRequest("countriesList",null,null);
    }

    getCountriesListOfUser(user : UserModel){
        return this.getRequest("countriesList",user.id, null);
    }

    addCountriesList(user : UserModel){
        return this.postRequest("countriesList",user);
    }

    modifyCountriesList(user : UserModel){
        return this.patchRequest("countriesList",user.countrieList, user.id);
    }
}

