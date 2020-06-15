import { CountryCodeModel } from './countryCode.model';
import { LocationModel } from './location.model';
import { DataReportModel } from './dataReport.model';

export class CountryModel{
    idCountry : number;
    name: String;
    countryCode: CountryCodeModel;
    location: LocationModel;

    dataReport: Array<DataReportModel>;
    offset: Date;

    deaths: number;
    recovered: number;
    confirmed: number;

}