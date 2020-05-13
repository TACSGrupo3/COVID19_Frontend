import { CountryCodeModel } from './countryCode.model';
import { LocationModel } from './location.model';

export class CountryModel{
    id : number;
    name: String;
    countryCode: CountryCodeModel;
    location: LocationModel;
}