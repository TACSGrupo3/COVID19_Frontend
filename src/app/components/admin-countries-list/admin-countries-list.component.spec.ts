import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {AdminCountriesListComponent} from './admin-countries-list.component';
import {AuthService} from "../../services/auth.service";
import {AdminService} from "../../services/admin.service";
import {HttpClient, HttpHandler} from "@angular/common/http";
import {AngularFirestore} from "@angular/fire/firestore";
import {DatePipe} from "@angular/common";
import {CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";
import {RouterTestingModule} from "@angular/router/testing";
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('AdminCountriesListComponent', () => {
  let component: AdminCountriesListComponent;
  let fixture: ComponentFixture<AdminCountriesListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AdminCountriesListComponent],
      imports: [RouterTestingModule, HttpClientTestingModule],
      providers: [AuthService, AngularFirestore, DatePipe, AdminService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminCountriesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
