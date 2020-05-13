import { CountryModel } from './country.model';

export class CountriesListModel {
    id: number;
    name: string;
    countries: Array<CountryModel> = new Array<CountryModel>();
    creationDate: Date ;
}
