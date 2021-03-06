import {TestBed, async} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {AppComponent} from './app.component';
import {CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";
import {AuthService} from "./services/auth.service";
import {AngularFirestore} from '@angular/fire/firestore';
import {AngularFireModule} from "@angular/fire";
import {environment} from "../environments/environment";
import {DatePipe} from "@angular/common";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {CountriesServices} from "./services/countries.service";

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        AngularFireModule.initializeApp(environment.firebaseConfig),
        HttpClientTestingModule
      ],
      declarations: [
        AppComponent
      ],
      providers: [AuthService, AngularFirestore, DatePipe,CountriesServices],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

});
