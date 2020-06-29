import { TestBed } from '@angular/core/testing';

import { AuthGuard } from './auth.guard';
import {AuthService} from "../services/auth.service";
import {AngularFireModule} from "@angular/fire";
import {environment} from "../../environments/environment";
import {HttpClient, HttpHandler} from "@angular/common/http";
import {AngularFirestore} from "@angular/fire/firestore";
import {DatePipe} from "@angular/common";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";
import {RouterTestingModule} from "@angular/router/testing";

describe('AuthGuard', () => {
  let guard: AuthGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[AngularFireModule.initializeApp(environment.firebaseConfig),RouterTestingModule],
      providers: [AuthService, HttpClient,HttpHandler,AngularFirestore,DatePipe,MatSnackBar],
    });
    guard = TestBed.inject(AuthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
