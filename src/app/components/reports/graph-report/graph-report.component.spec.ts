import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphReportComponent } from './graph-report.component';
import {MessageService} from "primeng";
import {AuthService} from "../../../services/auth.service";
import {HttpClient, HttpHandler} from "@angular/common/http";
import {AngularFirestore} from "@angular/fire/firestore";
import {DatePipe} from "@angular/common";
import {CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";
import {ReportsService} from "../../../services/reports.service";
import {Router} from "@angular/router";
import {RouterTestingModule} from "@angular/router/testing";

describe('GraphReportComponent', () => {
  let component: GraphReportComponent;
  let fixture: ComponentFixture<GraphReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GraphReportComponent ],
      imports: [RouterTestingModule],
      providers: [AuthService, HttpClient,HttpHandler,AngularFirestore,DatePipe,MessageService,ReportsService],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GraphReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
