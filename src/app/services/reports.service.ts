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
        url = `${this.SERVIDOR_API}${servicio}/${paramsString}`;

        return this.http.get(url);

    }

    private paramsString(params: any, queryParams: Array<any>) {
        if (!params) params = "";
        if (queryParams) {
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

    getReport(params: any[]) {
        let url: string = "";
        for (let i = 0; i < params.length; i++) {
            if (i != 0) {
                url = `${url}&`;
            }
            url = `${url}country=${params[i]}&offset=${params[i + 1]}`;
            i++;
        }
        return this.getRequest("report", null, [url]);
    }
}

