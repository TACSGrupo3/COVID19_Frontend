import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserModel } from '../model/user.model';

@Injectable()
export class ReportsService {
    readonly SERVIDOR_API: string = "/api/";

    constructor(private http: HttpClient) { }

    private getRequest(servicio: string, params: any, queryParams: Array<any>): Observable<any> {
        var url: string;
        let paramsString = this.paramsString(params, queryParams);
        url = this.SERVIDOR_API + servicio + "/" + paramsString;

        return this.http.get(url);

    }

    private postRequest(servicio: string, body: any): Observable<any> {
        var url: string;
        url = this.SERVIDOR_API + servicio;
        let myHeaders: HttpHeaders = new HttpHeaders();
        let options = { headers: myHeaders };

        return this.http.post(url, body, options);
    }

    private putRequest(servicio: string, body: any): Observable<any> {
        var url: string;
        url = this.SERVIDOR_API + servicio;
        let myHeaders: HttpHeaders = new HttpHeaders();
        let options = { headers: myHeaders };

        return this.http.put(url, body, options);
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

    getReport(listId: number, countryId: number){
        return this.getRequest("report",listId,["baseCountryId="+countryId]);
    }
}

