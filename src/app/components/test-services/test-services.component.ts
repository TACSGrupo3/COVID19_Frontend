import { Component, OnInit } from '@angular/core';
import { ServiceTest } from 'src/app/model/serviceTest.model';
import { UserModel } from 'src/app/model/user.model';
import { CountryModel } from 'src/app/model/country.model';
import { ListCountriesModel } from 'src/app/model/listCountries.model';
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
    serviceCountries.name = "findAll";
    serviceCountries.url = "/countries";
    serviceCountries.method = "GET";
    serviceCountries.testParam = "";
    serviceCountries.status = false;
    serviceCountries.isLoading = false;
    this.listServices.push(serviceCountries);

    let serviceCountriesNear = new ServiceTest();
    serviceCountriesNear.name = "findNearCountries";
    serviceCountriesNear.url = "/countries?near={{NameCountry}}";
    serviceCountriesNear.method = "GET";
    serviceCountriesNear.testParam = "Argentina";
    serviceCountriesNear.status = false;
    serviceCountriesNear.isLoading = false;
    this.listServices.push(serviceCountriesNear);

    let serviceAddListCountries = new ServiceTest();
    serviceAddListCountries.name = "addListCountries";
    serviceAddListCountries.url = "/listCountries";
    serviceAddListCountries.method = "POST";
    serviceAddListCountries.testParam = this.createUserWithCountries();
    serviceAddListCountries.status = false;
    serviceAddListCountries.isLoading = false;
    this.listServices.push(serviceAddListCountries);

    let serviceModifyListCountries = new ServiceTest();
    serviceModifyListCountries.name = "modifyListCountries";
    serviceModifyListCountries.url = "/listCountries";
    serviceModifyListCountries.method = "PUT";
    serviceModifyListCountries.testParam = this.createUserWithCountries();
    serviceModifyListCountries.status = false;
    serviceModifyListCountries.isLoading = false;
    this.listServices.push(serviceModifyListCountries);

    let adminUsers = new ServiceTest();
    adminUsers.name = "getUsers";
    adminUsers.url = "/admin/users/{{userId}}";
    adminUsers.method = "GET";
    adminUsers.testParam = 1;
    adminUsers.status = false;
    adminUsers.isLoading = false;
    this.listServices.push(adminUsers);

    let adminLists = new ServiceTest();
    adminLists.name = "getLists";
    adminLists.url = "/admin/lists?IDantiguedad={{idAntiguedad}}";
    adminLists.method = "GET";
    adminLists.testParam = 2;
    adminLists.status = false;
    adminLists.isLoading = false;
    this.listServices.push(adminLists);

    let adminCountries = new ServiceTest();
    adminCountries.name = "getCountries";
    adminCountries.url = "/admin/lists/{{idLista1}}?compare={{idLista2}}";
    adminCountries.method = "GET";
    adminCountries.testParam = [1,2];
    adminCountries.status = false;
    adminCountries.isLoading = false;
    this.listServices.push(adminCountries);

    let adminInteresados = new ServiceTest();
    adminInteresados.name = "getInteresados";
    adminInteresados.url = "/admin/country/{{countryId}}";
    adminInteresados.method = "GET";
    adminInteresados.testParam = 3;
    adminInteresados.status = false;
    adminInteresados.isLoading = false;
    this.listServices.push(adminInteresados);


    let report = new ServiceTest();
    report.name = "getReport";
    report.url = "/report/{{listId}}?baseCountryId={{countryId}}";
    report.method = "GET";
    report.testParam = [1,5];
    report.status = false;
    report.isLoading = false;
    this.listServices.push(report);
  }

  createUserWithCountries(): UserModel {
    let userWithCountries: UserModel = new UserModel();
    userWithCountries.id = 1;
    userWithCountries.username = "admin";
    userWithCountries.firstName = "admin";
    userWithCountries.lastName = "admin";
    let countriesList: ListCountriesModel = new ListCountriesModel();
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
    userWithCountries.countrieList = countriesList;

    return userWithCountries;
  }

  testService() {
    this.tested = true;
    console.log("Inicio Testing Services");
    this.listServices.forEach(service => {
      service.isLoading = true;
    });

    //Servicio: findAll
    let index = this.listServices.findIndex(element => element.name === "findAll");
    this.countriesServices.findAll().subscribe(data => {
      this.listServices[index].status = true;
      this.listServices[index].isLoading = false;
    }, error => {
      this.listServices[index].status = false;
      this.listServices[index].isLoading = false;
    });

    //Servicio: findNearCountries
    let index2 = this.listServices.findIndex(element => element.name === "findNearCountries");
    this.countriesServices.findNearCountries(this.listServices[index2].testParam).subscribe(data => {
      this.listServices[index2].status = true;
      this.listServices[index2].isLoading = false;
    }, error => {
      this.listServices[index2].status = false;
      this.listServices[index2].isLoading = false;
    });

    //Servicio: addListCountries
    let index3 = this.listServices.findIndex(element => element.name === "addListCountries");
    this.countriesServices.addListCountries(this.listServices[index3].testParam).subscribe(data => {
      this.listServices[index3].status = true;
      this.listServices[index3].isLoading = false;
    }, error => {
      this.listServices[index3].status = false;
      this.listServices[index3].isLoading = false;
    });

    //Servicio: modifyListCountries
    let index4 = this.listServices.findIndex(element => element.name === "modifyListCountries");
    this.countriesServices.modifyListCountries(this.listServices[index4].testParam).subscribe(data => {
      this.listServices[index4].status = true;
      this.listServices[index4].isLoading = false;
    }, error => {
      this.listServices[index4].status = false;
      this.listServices[index4].isLoading = false;
    });

    //Servicio: getUsers
    let index5 = this.listServices.findIndex(element => element.name === "getUsers");
    this.adminService.getUser(this.listServices[index5].testParam).subscribe(data => {
      this.listServices[index5].status = true;
      this.listServices[index5].isLoading = false;
    }, error => {
      this.listServices[index5].status = false;
      this.listServices[index5].isLoading = false;
    });

    //Servicio: getLists
    let index6 = this.listServices.findIndex(element => element.name === "getLists");
    this.adminService.getLists(this.listServices[index6].testParam).subscribe(data => {
      this.listServices[index6].status = true;
      this.listServices[index6].isLoading = false;
    }, error => {
      this.listServices[index6].status = false;
      this.listServices[index6].isLoading = false;
    });

    //Servicio: getCountries
    let index7 = this.listServices.findIndex(element => element.name === "getCountries");
    this.adminService.getCountries(this.listServices[index7].testParam[0],this.listServices[index7].testParam[1]).subscribe(data => {
      this.listServices[index7].status = true;
      this.listServices[index7].isLoading = false;
    }, error => {
      this.listServices[index7].status = false;
      this.listServices[index7].isLoading = false;
    });

    //Servicio: getInteresados
    let index8 = this.listServices.findIndex(element => element.name === "getInteresados");
    this.adminService.getInteresados(this.listServices[index8].testParam).subscribe(data => {
      this.listServices[index8].status = true;
      this.listServices[index8].isLoading = false;
    }, error => {
      this.listServices[index8].status = false;
      this.listServices[index8].isLoading = false;
    });

     //Servicio: getReport
     let index9 = this.listServices.findIndex(element => element.name === "getReport");
     this.reportService.getReport(this.listServices[index9].testParam[0],this.listServices[index9].testParam[1]).subscribe(data => {
       this.listServices[index9].status = true;
       this.listServices[index9].isLoading = false;
     }, error => {
       this.listServices[index9].status = false;
       this.listServices[index9].isLoading = false;
     });

    console.log("Fin Testing Services");
  }

}
