import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {UserModel} from '../model/user.model';
import {CountriesListModel} from '../model/countriesList.model';
import {shareReplay} from 'rxjs/operators';
import {CountryModel} from "../model/country.model";

const CACHE_SIZE = 1;

@Injectable()
export class CountriesServices {
  readonly SERVIDOR_API: string = "/api/";

  private cache$: Observable<Array<CountryModel>>;

  constructor(private http: HttpClient) {
  }

  private getRequest(servicio: string, params: any, queryParams: Array<any>): Observable<any> {
    var url: string;
    let paramsString = this.paramsString(params, queryParams);
    url = this.SERVIDOR_API + servicio + "/" + paramsString;

    return this.http.get(url);
  }

  postRequest(servicio: string, body: any, idToAdd: any): Observable<any> {
    var url: string;
    url = this.SERVIDOR_API + servicio + "/" + idToAdd;
    let myHeaders: HttpHeaders = new HttpHeaders();
    let options = {headers: myHeaders};

    return this.http.post(url, body, options);
  }

  putRequest(servicio: string, body: any, idToModify: any): Observable<any> {
    var url: string;
    url = this.SERVIDOR_API + servicio + "/" + idToModify;
    let myHeaders: HttpHeaders = new HttpHeaders();
    let options = {headers: myHeaders};

    return this.http.put(url, body, options);
  }

  deleteRequest(servicio: string, params: any): Observable<any> {
    var url: string;
    let paramsString = this.paramsString(params, null);
    url = this.SERVIDOR_API + servicio + "/" + paramsString;

    return this.http.delete(url);
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
    if (!this.cache$) {
      this.cache$ = this.getRequest("countries", null, null).pipe(
        shareReplay(CACHE_SIZE));
    }
    return this.cache$;
  }

  findNearCountries(latitud: any, longitud: any, maxCant: any) {
    return this.getRequest("countries", null, ["latitude=" + latitud, "longitude=" + longitud, "maxCountries=" + maxCant]);
  }

  getCountriesList() {
    return this.getRequest("countriesList", null, null);
  }

  getCountriesListById(listId: number) {
    return this.getRequest("countriesList", listId, null);
  }

  getCountriesListOfUser(user: UserModel) {
    return this.getRequest("users", user.id + "/countriesList", null);
  }

  addCountriesList(userId: String, countryList: Array<CountriesListModel>) {
    return this.postRequest("users", countryList, userId + "/countriesList");
  }

  modifyCountriesList(listToModify: CountriesListModel) {
    return this.putRequest("countriesList", listToModify, listToModify.id);
  }

  deleteCountriesList(countriesListId: number) {
    return this.deleteRequest("countriesList", countriesListId);
  }
}

