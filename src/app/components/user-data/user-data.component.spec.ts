import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {UserDataComponent} from './user-data.component';
import {AuthService} from "../../services/auth.service";
import {AdminService} from "../../services/admin.service";
import {HttpClient, HttpHandler} from "@angular/common/http";
import {AngularFirestore} from "@angular/fire/firestore";
import {DatePipe} from "@angular/common";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";
import {MatDialog, MatDialogModule} from "@angular/material/dialog";
import {Overlay} from "@angular/cdk/overlay";
import {FormsModule} from "@angular/forms";
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('UserDataComponent', () => {
  let component: UserDataComponent;
  let fixture: ComponentFixture<UserDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UserDataComponent],
      imports: [MatDialogModule,HttpClientTestingModule],
      providers: [AuthService, AngularFirestore, DatePipe, MatSnackBar, Router, AdminService, MatDialog, Overlay],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
