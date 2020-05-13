import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CountriesListComponent } from './components/countriesList/countriesList.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ProfileComponent } from './components/profile/profile.component';
import { AuthGuard } from './guard/auth.guard';
import { TestServicesComponent } from './components/test-services/test-services.component';
import { ReportsComponent } from './components/reports/reports.component';
import { NewCountriesListComponent } from './components/countriesList/new-countries-list/new-countries-list.component';


const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'register', component: RegisterComponent},
  { path: 'login', component: LoginComponent},
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]},
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
  { path: 'newCountriesList', component: NewCountriesListComponent, canActivate: [AuthGuard]},
  { path: 'countriesList', component: CountriesListComponent, canActivate: [AuthGuard]},
  { path: 'testServices', component: TestServicesComponent, canActivate: [AuthGuard]},
  { path: 'reports', component: ReportsComponent, canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
