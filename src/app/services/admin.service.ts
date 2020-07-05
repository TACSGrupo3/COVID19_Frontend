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

    getRequestWithPost(servicio: string, params: any, queryParams: Array<any>, postRequest: string) : Observable<any> {
        var url: string;
        let paramsString = this.paramsString(params,queryParams);
        url = `${this.SERVIDOR_API}${servicio}/${paramsString}/${postRequest}`;
        
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
        url = this.SERVIDOR_API + servicio + idToModify;
        let myHeaders: HttpHeaders = new HttpHeaders();
        let options = { headers : myHeaders };
        
        return this.http.patch(url, body,options);
    }
    paramsString(params: any, queryParams : Array<any>) {
        if(!params) params = "";
        if(queryParams){
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

    getAllUser(){
        return this.getRequest("admin/users",null,null);
    }

    getAllUserPaginated(page : number){
        return this.getRequest("admin/users",null,[`page=${page}`]);
    }

    getAllUserPaginatedFiltered(page : number, filter: string){
        return this.getRequest("admin/users",null,[`page=${page}`,`filter=${filter}`]);
    }

    getUser(userId : number){
        return this.getRequest("admin/users",userId,null);
    }

    getCountriesLists(){
        return this.getRequest("admin/countriesList",null,null);
    }

    getCountriesListsFilterByName(name: string){
        return this.getRequest("admin/countriesList",null,[`name=${name}`]);
    }

    getCountriesListsFiltered(cantDays : number){
        return this.getRequest("admin/countriesList",null,[`filterLast=${cantDays}`]);
    }

    getUserIntrested(idCountry : number){
        return this.getRequestWithPost("admin/countries",idCountry,null,"users");
    }
}

