import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserIntrestedComponent } from './user-intrested.component';

describe('UserIntrestedComponent', () => {
  let component: UserIntrestedComponent;
  let fixture: ComponentFixture<UserIntrestedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserIntrestedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserIntrestedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
