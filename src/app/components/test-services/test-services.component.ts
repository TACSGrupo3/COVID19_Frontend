import { Component, OnInit } from '@angular/core';
import { ServiceTest } from 'src/app/model/serviceTest.model';
import { UserModel } from 'src/app/model/user.model';
import { CountryModel } from 'src/app/model/country.model';
import { CountriesListModel } from 'src/app/model/countriesList.model';
import { CountriesServices } from 'src/app/services/countries.service';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
import { ReportsService } from 'src/app/services/reports.service';

@Component({
  selector: 'app-test-services',
  templateUrl: './test-services.component.html',
  styleUrls: ['./test-services.component.scss']
})
export class TestServicesComponent implements OnInit {
  public listServices: Array<ServiceTest> = new Array<ServiceTest>();
  public tested: boolean = false;
  public displayedColumns: string[] = ['name', 'type', 'url', 'status'];
  constructor(private router: Router, private authService: AuthService,
    private countriesServices: CountriesServices, private adminService: AdminService,
    private reportService: ReportsService) { }

  ngOnInit(): void {
    if (!this.authService.isAdmin)
      this.router.navigate(['/home']);

    this.tested = false;

    let serviceCountries = new ServiceTest();
    serviceCountries.name = "countriesList";
    serviceCountries.url = "/countries";
    serviceCountries.method = "GET";
    serviceCountries.testParam = "";
    serviceCountries.status = false;
    serviceCountries.isLoading = false;
    this.listServices.push(serviceCountries);

    let serviceCountriesNear = new ServiceTest();
    serviceCountriesNear.name = "listNearedCountries";
    serviceCountriesNear.url = "/countries?latitud={{latitud}}&longitud={{longitud}}";
    serviceCountriesNear.method = "GET";
    serviceCountriesNear.testParam = ["-34.6253141", "-58.56012939999999","5"];
    serviceCountriesNear.status = false;
    serviceCountriesNear.isLoading = false;
    this.listServices.push(serviceCountriesNear);

    let serviceGetListCountries = new ServiceTest();
    serviceGetListCountries.name = "getCountriesList";
    serviceGetListCountries.url = "/countriesList";
    serviceGetListCountries.method = "GET";
    serviceGetListCountries.testParam = "";
    serviceGetListCountries.status = false;
    serviceGetListCountries.isLoading = false;
    this.listServices.push(serviceGetListCountries);

    let serviceGetCountriesListOfUser = new ServiceTest();
    serviceGetCountriesListOfUser.name = "getCountriesListOfUser";
    serviceGetCountriesListOfUser.url = "/countriesList";
    serviceGetCountriesListOfUser.method = "GET";
    serviceGetCountriesListOfUser.testParam = this.createUserWithCountriesToModify();
    serviceGetCountriesListOfUser.status = false;
    serviceGetCountriesListOfUser.isLoading = false;
    this.listServices.push(serviceGetCountriesListOfUser);

    let serviceAddListCountries = new ServiceTest();
    serviceAddListCountries.name = "addCountriesList";
    serviceAddListCountries.url = "/users/{{userId}}/countriesList";
    serviceAddListCountries.method = "POST";
    serviceAddListCountries.testParam = [2,this.createUserWithCountries()];
    serviceAddListCountries.status = false;
    serviceAddListCountries.isLoading = false;
    this.listServices.push(serviceAddListCountries);

    let serviceModifyListCountries = new ServiceTest();
    serviceModifyListCountries.name = "modifyCountriesList";
    serviceModifyListCountries.url = "/countriesList/{{countriesListId}}";
    serviceModifyListCountries.method = "PUT";
    serviceModifyListCountries.testParam = this.createListToModify();
    serviceModifyListCountries.status = false;
    serviceModifyListCountries.isLoading = false;
    this.listServices.push(serviceModifyListCountries);

    let adminAllUsers = new ServiceTest();
    adminAllUsers.name = "getAllUsers";
    adminAllUsers.url = "/admin/users";
    adminAllUsers.method = "GET";
    adminAllUsers.testParam = "";
    adminAllUsers.status = false;
    adminAllUsers.isLoading = false;
    this.listServices.push(adminAllUsers);

    let adminUsers = new ServiceTest();
    adminUsers.name = "getUsers";
    adminUsers.url = "/admin/users/{{userId}}";
    adminUsers.method = "GET";
    adminUsers.testParam = 1;
    adminUsers.status = false;
    adminUsers.isLoading = false;
    this.listServices.push(adminUsers);

    let adminLists = new ServiceTest();
    adminLists.name = "getCountriesLists";
    adminLists.url = "/admin/countriesList";
    adminLists.method = "GET";
    adminLists.testParam = "";
    adminLists.status = false;
    adminLists.isLoading = false;
    this.listServices.push(adminLists);

    let adminCountries = new ServiceTest();
    adminCountries.name = "getCountriesListFiltered";
    adminCountries.url = "/admin/countriesList?filterLast={{cantDays}}";
    adminCountries.method = "GET";
    adminCountries.testParam = 3;
    adminCountries.status = false;
    adminCountries.isLoading = false;
    this.listServices.push(adminCountries);

    let adminInteresados = new ServiceTest();
    adminInteresados.name = "getUserIntrested";
    adminInteresados.url = "/admin/countries/{{countryId}}/users";
    adminInteresados.method = "GET";
    adminInteresados.testParam = 3;
    adminInteresados.status = false;
    adminInteresados.isLoading = false;
    this.listServices.push(adminInteresados);


    let report = new ServiceTest();
    report.name = "getReport";
    report.url = "/report?country={{countryId}}&offset={{offset}}";
    report.method = "GET";
    report.testParam = [7, "03/01/2020", 22, "04/01/2020"];
    report.status = false;
    report.isLoading = false;
    this.listServices.push(report);
  }

  createUserWithCountries(): Array<CountriesListModel> {
    let countriesList: CountriesListModel = new CountriesListModel();
    let argentina: CountryModel = new CountryModel();
    argentina.id = 1;
    argentina.name = "Argentina";
    let brasil: CountryModel = new CountryModel();
    brasil.id = 2;
    brasil.name = "Brazil";
    countriesList.name = "Arg - Bra";
    countriesList.countries.push(argentina);
    countriesList.countries.push(brasil);

    let countriesLists : Array<CountriesListModel> = new Array<CountriesListModel>();
    countriesLists.push(countriesList);
    return countriesLists;
  }

  createUserWithCountriesToModify(): UserModel {
    let userWithCountries: UserModel = new UserModel();
    userWithCountries.id = 1
    userWithCountries.username = "admin";
    userWithCountries.firstName = "admin";
    userWithCountries.lastName = "admin";
    let listCountriesList : Array<CountriesListModel> = new Array<CountriesListModel>();
    let countriesList: CountriesListModel = new CountriesListModel();
    let argentina: CountryModel = new CountryModel();
    argentina.id = 1;
    argentina.name = "Argentina";
    let brasil: CountryModel = new CountryModel();
    brasil.id = 2;
    brasil.name = "Brasil";
    countriesList.id = 1;
    countriesList.name = "Arg - Bra";
    countriesList.countries.push(argentina);
    countriesList.countries.push(brasil);
    countriesList.creationDate = new Date();
    listCountriesList.push(countriesList);
    userWithCountries.countriesList = listCountriesList;

    return userWithCountries;
  }

  createListToModify() : CountriesListModel{
    let countriesList: CountriesListModel = new CountriesListModel();
    let argentina: CountryModel = new CountryModel();
    argentina.id = 7;
    argentina.name = "Argentina";
    countriesList.id = 1;
    countriesList.name = "Arg";
    countriesList.countries.push(argentina);
    countriesList.creationDate = new Date();

    return countriesList
  }

  testService() {
    this.tested = true;
    console.log("Inicio Testing Services");
    this.listServices.forEach(service => {
      service.isLoading = true;
    });

    //Servicio: listCountries
    let index = this.listServices.findIndex(element => element.name === "countriesList");
    this.countriesServices.findAll().subscribe(data => {
      this.listServices[index].status = true;
      this.listServices[index].isLoading = false;
    }, error => {
      this.listServices[index].status = false;
      this.listServices[index].isLoading = false;
    });

    //Servicio: listNearedCountries
    let index2 = this.listServices.findIndex(element => element.name === "listNearedCountries");
    this.countriesServices.findNearCountries(this.listServices[index2].testParam[0],
      this.listServices[index2].testParam[1],this.listServices[index2].testParam[2]).subscribe(data => {
        this.listServices[index2].status = true;
        this.listServices[index2].isLoading = false;
      }, error => {
        this.listServices[index2].status = false;
        this.listServices[index2].isLoading = false;
      });

    //Servicio: getListCountries
    let index3 = this.listServices.findIndex(element => element.name === "getCountriesList");
    this.countriesServices.getCountriesList().subscribe(data => {
      this.listServices[index3].status = true;
      this.listServices[index3].isLoading = false;
    }, error => {
      this.listServices[index3].status = false;
      this.listServices[index3].isLoading = false;
    });

    //Servicio: getListCountriesOfUser
    let index4 = this.listServices.findIndex(element => element.name === "getCountriesListOfUser");
    this.countriesServices.getCountriesListOfUser(this.listServices[index4].testParam).subscribe(data => {
      this.listServices[index4].status = true;
      this.listServices[index4].isLoading = false;
    }, error => {
      this.listServices[index4].status = false;
      this.listServices[index4].isLoading = false;
    });

    //Servicio: addListCountries
    let index5 = this.listServices.findIndex(element => element.name === "addCountriesList");
    this.countriesServices.addCountriesList(this.listServices[index5].testParam[0],
        this.listServices[index5].testParam[1]).subscribe(data => {
      this.listServices[index5].status = true;
      this.listServices[index5].isLoading = false;
    }, error => {
      this.listServices[index5].status = false;
      this.listServices[index5].isLoading = false;
    });

    //Servicio: modifyListCountries
    let index6 = this.listServices.findIndex(element => element.name === "modifyCountriesList");
    this.countriesServices.modifyCountriesList(this.listServices[index6].testParam).subscribe(data => {
      this.listServices[index6].status = true;
      this.listServices[index6].isLoading = false;
    }, error => {
      this.listServices[index6].status = false;
      this.listServices[index6].isLoading = false;
    });

    //Servicio: getAllUsers
    let index7 = this.listServices.findIndex(element => element.name === "getAllUsers");
    this.adminService.getAllUser().subscribe(data => {
      this.listServices[index7].status = true;
      this.listServices[index7].isLoading = false;
    }, error => {
      this.listServices[index7].status = false;
      this.listServices[index7].isLoading = false;
    });

    //Servicio: getUsers
    let index8 = this.listServices.findIndex(element => element.name === "getUsers");
    this.adminService.getUser(this.listServices[index8].testParam).subscribe(data => {
      this.listServices[index8].status = true;
      this.listServices[index8].isLoading = false;
    }, error => {
      this.listServices[index8].status = false;
      this.listServices[index8].isLoading = false;
    });

    //Servicio: getCountriesLists
    let index9 = this.listServices.findIndex(element => element.name === "getCountriesLists");
    this.adminService.getCountriesLists().subscribe(data => {
      this.listServices[index9].status = true;
      this.listServices[index9].isLoading = false;
    }, error => {
      this.listServices[index9].status = false;
      this.listServices[index9].isLoading = false;
    });

    //Servicio: getCountriesLists
    let index10 = this.listServices.findIndex(element => element.name === "getCountriesListFiltered");
    this.adminService.getCountriesListsFiltered(this.listServices[index10].testParam).subscribe(data => {
      this.listServices[index10].status = true;
      this.listServices[index10].isLoading = false;
    }, error => {
      this.listServices[index10].status = false;
      this.listServices[index10].isLoading = false;
    });

    //Servicio: getUserIntrested
    let index11 = this.listServices.findIndex(element => element.name === "getUserIntrested");
    this.adminService.getUserIntrested(this.listServices[index11].testParam).subscribe(data => {
      this.listServices[index11].status = true;
      this.listServices[index11].isLoading = false;
    }, error => {
      this.listServices[index11].status = false;
      this.listServices[index11].isLoading = false;
    });

    //Servicio: getReport
    let index12 = this.listServices.findIndex(element => element.name === "getReport");
    this.reportService.getReport(this.listServices[index12].testParam).subscribe(data => {
      this.listServices[index12].status = true;
      this.listServices[index12].isLoading = false;
    }, error => {
      this.listServices[index12].status = false;
      this.listServices[index12].isLoading = false;
    });

    console.log("Fin Testing Services");
  }

}
