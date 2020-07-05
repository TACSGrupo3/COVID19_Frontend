import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterComponent } from './register.component';
import {AuthService} from "../../services/auth.service";
import {HttpClient, HttpHandler} from "@angular/common/http";
import {AngularFireModule} from "@angular/fire";
import {environment} from "../../../environments/environment";
import {AngularFirestore} from "@angular/fire/firestore";
import {DatePipe} from "@angular/common";
import {MatSnackBar} from "@angular/material/snack-bar";
import {RouterTestingModule} from "@angular/router/testing";
import {FormsModule} from "@angular/forms";
import {BrowserModule} from "@angular/platform-browser";
import {CountriesServices} from "../../services/countries.service";

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterComponent ],
      imports:[AngularFireModule.initializeApp(environment.firebaseConfig), RouterTestingModule,BrowserModule,
        FormsModule],
      providers: [AuthService, HttpClient,HttpHandler,AngularFirestore,DatePipe,MatSnackBar,CountriesServices],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
