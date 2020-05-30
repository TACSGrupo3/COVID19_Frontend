import { CountriesListModel } from '../model/countriesList.model';
import { Injectable } from '@angular/core';
import { isNullOrUndefined } from 'util';

@Injectable({
    providedIn: 'root',
})
export class DataReportService {

    constructor() { }

    setList(list: CountriesListModel) {
        if (list != null) {
            let list_string = JSON.stringify(list);
            localStorage.setItem("reportList", list_string);
        }
    }

    getList(): CountriesListModel {
        let list_string = localStorage.getItem("reportList");
        if (!isNullOrUndefined(list_string)) {
            let list : CountriesListModel = JSON.parse(list_string);
            return list;
        }else{
            return null;
        }
    }
}