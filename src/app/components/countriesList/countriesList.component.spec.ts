import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {CountriesListComponent} from './countriesList.component';
import {AngularFireModule} from "@angular/fire";
import {environment} from "../../../environments/environment";
import {AuthService} from "../../services/auth.service";
import {HttpClient, HttpHandler} from "@angular/common/http";
import {AngularFirestore} from "@angular/fire/firestore";
import {DatePipe} from "@angular/common";
import {MatSnackBar} from "@angular/material/snack-bar";
import {AdminService} from "../../services/admin.service";
import {CountriesServices} from "../../services/countries.service";
import {MatDialog, MatDialogModule} from "@angular/material/dialog";
import {Overlay} from "@angular/cdk/overlay";
import {RouterTestingModule} from "@angular/router/testing";

describe('CountriesComponent', () => {
  let component: CountriesListComponent;
  let fixture: ComponentFixture<CountriesListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CountriesListComponent],
      imports: [AngularFireModule.initializeApp(environment.firebaseConfig), MatDialogModule, RouterTestingModule],
      providers: [AuthService, HttpClient, HttpHandler, AngularFirestore, DatePipe, MatSnackBar, AdminService, CountriesServices, MatDialog, Overlay],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CountriesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  /*it('should create', () => {
      expect(component).toBeTruthy();
    });*/
});
