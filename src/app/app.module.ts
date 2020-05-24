import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ChartsModule} from "ng2-charts";
import * as moment from 'moment/moment';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material-module';
import { HomeComponent } from './components/home/home.component';
import { CountriesListComponent } from './components/countriesList/countriesList.component';
import { CountriesServices } from './services/countries.service';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { FormsModule, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from './services/auth.service';
import { ProfileComponent } from './components/profile/profile.component';
import { TestServicesComponent } from './components/test-services/test-services.component';
import { AdminService } from './services/admin.service';
import { ReportsService } from './services/reports.service';
import { NgxSpinnerModule} from 'ngx-spinner';
import { environment } from '../environments/environment';

import { AngularFireModule } from '@angular/fire';
import { AngularFireAuth, AngularFireAuthModule } from '@angular/fire/auth';
import { AngularDualListBoxModule } from 'angular-dual-listbox';
import { NewCountriesListComponent } from './components/countriesList/new-countries-list/new-countries-list.component';
import { DialogComponent } from './components/dialog/dialog.component';
import { ConfirmModalComponent } from './components/countriesList/confirm-modal/confirm-modal.component';
import { AuthInterceptor } from './services/auth.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CountriesListComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    TestServicesComponent,
    NewCountriesListComponent,
    DialogComponent,
    ConfirmModalComponent
  ],
  imports: [
    AngularDualListBoxModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    FormsModule,
    NgxSpinnerModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    ChartsModule,
    ReactiveFormsModule
  ],
  providers: [ {
    provide : HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi   : true,
  },
    FormBuilder,
    AuthService,
    CountriesServices,
    AdminService,
    ReportsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
