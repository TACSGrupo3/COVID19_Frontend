import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import {AuthService} from "../../services/auth.service";
import {HttpClient, HttpHandler} from "@angular/common/http";
import {AngularFireModule} from "@angular/fire";
import {environment} from "../../../environments/environment";
import {AngularFirestore} from "@angular/fire/firestore";
import {DatePipe} from "@angular/common";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";
import {AdminService} from "../../services/admin.service";
import {RouterTestingModule} from "@angular/router/testing";
import {Overlay} from "@angular/cdk/overlay";
import {BrowserModule} from "@angular/platform-browser";
import {FormsModule} from "@angular/forms";

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports:[AngularFireModule.initializeApp(environment.firebaseConfig),RouterTestingModule,BrowserModule,
        FormsModule],
      declarations: [ LoginComponent ],
      providers: [AuthService, HttpClient,HttpHandler,AngularFirestore,DatePipe,MatSnackBar,AdminService,Overlay],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
