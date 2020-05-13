import { CountriesListModel } from './countriesList.model';
import { UserRoleModel } from './userRole.model';

export class UserModel {
    id: number;
    username: String;
    firstName: String;
    lastName: String;
    password: String;
    countrieList: CountriesListModel;
    userRole: UserRoleModel;
}