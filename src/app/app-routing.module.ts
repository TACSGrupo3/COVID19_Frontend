import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CountriesListComponent } from './components/countriesList/countriesList.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ProfileComponent } from './components/profile/profile.component';
import { AuthGuard } from './guard/auth.guard';
import { ReportsComponent } from './components/reports/reports.component';
import { NewCountriesListComponent } from './components/countriesList/new-countries-list/new-countries-list.component';
import { UserDataComponent } from './components/user-data/user-data.component';
import { CommonCountriesComponent } from './components/common-countries/common-countries.component';
import { UserIntrestedComponent } from './components/user-intrested/user-intrested.component';
import { AdminCountriesListComponent } from './components/admin-countries-list/admin-countries-list.component';
import { TableReportComponent } from './components/reports/table-report/table-report.component';
import { GraphReportComponent } from './components/reports/graph-report/graph-report.component';


const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'register', component: RegisterComponent},
  { path: 'login', component: LoginComponent},
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]},
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
  { path: 'newCountriesList', component: NewCountriesListComponent, canActivate: [AuthGuard]},
  { path: 'countriesList', component: CountriesListComponent, canActivate: [AuthGuard]},
  { path: 'reports', component: ReportsComponent, canActivate: [AuthGuard]},  
  { path: 'userData', component: UserDataComponent, canActivate: [AuthGuard]},  
  { path: 'commonCountries', component: CommonCountriesComponent, canActivate: [AuthGuard]}, 
  { path: 'userIntrested', component: UserIntrestedComponent, canActivate: [AuthGuard]}, 
  { path: 'adminCountriesList', component: AdminCountriesListComponent, canActivate: [AuthGuard]}, 
  { path: 'tableReport', component: TableReportComponent, canActivate: [AuthGuard]}, 
  { path: 'graphReport', component: GraphReportComponent, canActivate: [AuthGuard]}, 
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
