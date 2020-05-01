import { CountryModel } from './country.model';

export class ListCountriesModel {
    id: number;
    name: String;
    countries: Array<CountryModel> = new Array<CountryModel>();
    creationDate: Date ;
}
