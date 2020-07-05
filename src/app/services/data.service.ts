import { CountriesListModel } from '../model/countriesList.model';
import { Injectable } from '@angular/core';
import { isNullOrUndefined } from 'util';
import { UserModel } from '../model/user.model';

@Injectable({
    providedIn: 'root',
})
export class DataService {

    constructor() { }

    setReportList(list: CountriesListModel) {
        if (list) {
            let list_string = JSON.stringify(list);
            localStorage.setItem("reportList", list_string);
        }
    }

    getReportList(): CountriesListModel {
        let list_string = localStorage.getItem("reportList");
        if (!isNullOrUndefined(list_string)) {
            let list : CountriesListModel = JSON.parse(list_string);
            return list;
        }else{
            return null;
        }
    }

    setUserView(user : UserModel){
        if (user) {
            let user_string = JSON.stringify(user);
            localStorage.setItem("userView", user_string);
        }
    }

    getUserView(): UserModel{
        let user_string = localStorage.getItem("userView");
        if (!isNullOrUndefined(user_string)) {
            let user : UserModel = JSON.parse(user_string);
            return user;
        }else{
            return null;
        }
    }

}