import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {NewCountriesListComponent} from './new-countries-list.component';
import {AuthService} from "../../../services/auth.service";
import {HttpClient, HttpHandler} from "@angular/common/http";
import {AngularFirestore} from "@angular/fire/firestore";
import {DatePipe} from "@angular/common";
import {CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";
import {AngularFireModule} from "@angular/fire";
import {environment} from "../../../../environments/environment";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ExtraOptions, Route, Router} from "@angular/router";
import {AdminService} from "../../../services/admin.service";
import {CountriesServices} from "../../../services/countries.service";
import {MatDialog, MatDialogModule} from "@angular/material/dialog";
import {Overlay} from "@angular/cdk/overlay";
import {RouterTestingModule} from "@angular/router/testing";

describe('NewCountriesListComponent', () => {
  let component: NewCountriesListComponent;
  let fixture: ComponentFixture<NewCountriesListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NewCountriesListComponent],
      imports: [AngularFireModule.initializeApp(environment.firebaseConfig), MatDialogModule, RouterTestingModule],
      providers: [AuthService, HttpClient, HttpHandler, AngularFirestore, DatePipe, MatSnackBar, AdminService, CountriesServices, MatDialog, Overlay],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    RouterTestingModule.withRoutes([this.router.getCurrentNavigation().extras.state.data] as Route[], {} as ExtraOptions);
    fixture = TestBed.createComponent(NewCountriesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  /*it('should create', () => {
    expect(component).toBeTruthy();
  });*/
  afterEach(() => {
    TestBed.resetTestingModule();
  });
});
