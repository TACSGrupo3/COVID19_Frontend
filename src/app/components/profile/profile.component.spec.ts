import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ProfileComponent} from './profile.component';
import {AuthService} from "../../services/auth.service";
import {HttpClient, HttpHandler} from "@angular/common/http";
import {AngularFirestore} from "@angular/fire/firestore";
import {DatePipe} from "@angular/common";
import {CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";
import {AngularFireModule} from "@angular/fire";
import {environment} from "../../../environments/environment";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Overlay} from "@angular/cdk/overlay";
import {FormsModule} from '@angular/forms';
import {BrowserModule} from "@angular/platform-browser";
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProfileComponent],
      imports: [AngularFireModule.initializeApp(environment.firebaseConfig), BrowserModule,
        FormsModule, HttpClientTestingModule],
      providers: [AuthService, AngularFirestore, DatePipe, MatSnackBar, Overlay, FormsModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

 /* it('should create', () => {
    expect(component).toBeTruthy();
  });*/
});
