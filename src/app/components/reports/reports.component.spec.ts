import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ReportsComponent} from './reports.component';
import {AngularFireModule} from "@angular/fire";
import {environment} from "../../../environments/environment";
import {AuthService} from "../../services/auth.service";
import {HttpClient, HttpHandler} from "@angular/common/http";
import {AngularFirestore} from "@angular/fire/firestore";
import {DatePipe} from "@angular/common";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";
import {RouterTestingModule} from "@angular/router/testing";

describe('ReportsComponent', () => {
  let component: ReportsComponent;
  let fixture: ComponentFixture<ReportsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ReportsComponent],
      imports: [RouterTestingModule, AngularFireModule.initializeApp(environment.firebaseConfig), RouterTestingModule],
      providers: [AuthService, AngularFirestore, DatePipe, MatSnackBar],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
