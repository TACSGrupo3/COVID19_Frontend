import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserIntrestedComponent } from './user-intrested.component';
import {AuthService} from "../../services/auth.service";
import {HttpClient, HttpHandler} from "@angular/common/http";
import {AngularFirestore} from "@angular/fire/firestore";
import {DatePipe} from "@angular/common";
import {CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";
import {AdminService} from "../../services/admin.service";
import {CountriesServices} from "../../services/countries.service";
import {MatDialog, MatDialogModule} from "@angular/material/dialog";
import {Overlay} from "@angular/cdk/overlay";

describe('UserIntrestedComponent', () => {
  let component: UserIntrestedComponent;
  let fixture: ComponentFixture<UserIntrestedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserIntrestedComponent ],
      imports :[MatDialogModule],
      providers: [AuthService, HttpClient,HttpHandler,AngularFirestore,DatePipe,AdminService,CountriesServices,MatDialog,Overlay],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserIntrestedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  /*it('should create', () => {
    expect(component).toBeTruthy();
  });*/
});
