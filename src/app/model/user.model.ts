import { ListCountriesModel } from './listCountries.model';

export class UserModel {
    id: number;
    username: String;
    firstName: String;
    lastName: String;
    password: String;
    countrieList: ListCountriesModel;
}