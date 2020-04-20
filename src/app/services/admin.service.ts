import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserModel } from '../model/user.model';

@Injectable()
export class AdminService {
    readonly SERVIDOR_API: string = "/api/";
    
    constructor(private http: HttpClient) { }

    getRequest(servicio: string, params: any, queryParams: Array<any>) : Observable<any> {
        var url: string;
        let paramsString = this.paramsString(params,queryParams);
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

    putRequest(servicio: string, body: any) : Observable<any> {
        var url: string;
        url = this.SERVIDOR_API + servicio;
        let myHeaders: HttpHeaders = new HttpHeaders();
        let options = { headers : myHeaders };
        
        return this.http.put(url, body,options);
    }
    paramsString(params: any, queryParams : Array<any>) {
        if(params == null) params = "";
        if(queryParams != null){
            for(let i = 0; i < queryParams.length; i++){
                if(i == 0){
                    params = params.toString().concat("?");
                }else{
                    params = params.toString().concat("&")
                }
                params = params.toString().concat(queryParams[i].toString());
            }
        }
        return params;
    }

    getUser(userId : number){
        return this.getRequest("admin/users",userId,null);
    }

    getLists(idAntiguedad : number){
        return this.getRequest("admin/lists",null,["IDantiguedad="+idAntiguedad]);
    }

    getCountries(idList1 : number, idList2: number ){
        return this.getRequest("admin/lists",idList1,["compare="+idList2]);
    }

    getInteresados(idCountry : number){
        return this.getRequest("admin/country",idCountry,null);
    }
}

