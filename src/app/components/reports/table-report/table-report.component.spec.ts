import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {TableReportComponent} from './table-report.component';
import {AuthService} from "../../../services/auth.service";
import {ReportsService} from "../../../services/reports.service";
import {HttpClient, HttpHandler} from "@angular/common/http";
import {AngularFirestore} from "@angular/fire/firestore";
import {DatePipe} from "@angular/common";
import {CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";
import {RouterTestingModule} from "@angular/router/testing";

describe('TableReportComponent', () => {
  let component: TableReportComponent;
  let fixture: ComponentFixture<TableReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TableReportComponent],
      imports: [RouterTestingModule],
      providers: [AuthService, HttpClient, HttpHandler, AngularFirestore, DatePipe, ReportsService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
