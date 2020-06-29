import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonCountriesComponent } from './common-countries.component';
import {AngularFireModule} from "@angular/fire";
import {environment} from "../../../environments/environment";
import {AuthService} from "../../services/auth.service";
import {HttpClient, HttpHandler} from "@angular/common/http";
import {AngularFirestore} from "@angular/fire/firestore";
import {DatePipe} from "@angular/common";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";
import {AdminService} from "../../services/admin.service";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('CommonCountriesComponent', () => {
  let component: CommonCountriesComponent;
  let fixture: ComponentFixture<CommonCountriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommonCountriesComponent ],
      imports:[AngularFireModule.initializeApp(environment.firebaseConfig),MatAutocompleteModule, HttpClientTestingModule],
      providers: [AuthService,AngularFirestore,DatePipe,MatSnackBar,Router,AdminService],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommonCountriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
