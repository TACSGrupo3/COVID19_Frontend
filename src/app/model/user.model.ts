import { CountriesListModel } from './countriesList.model';

export class UserModel {
    id: number;
    username: String;
    firstName: String;
    lastName: String;
    password: String;
    countriesList: Array<CountriesListModel>;
    userRole: String;
    lastAccess: Date;
    telegram_chat_id: number;
}