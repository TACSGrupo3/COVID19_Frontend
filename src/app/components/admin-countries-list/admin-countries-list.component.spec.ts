import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCountriesListComponent } from './admin-countries-list.component';

describe('AdminCountriesListComponent', () => {
  let component: AdminCountriesListComponent;
  let fixture: ComponentFixture<AdminCountriesListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminCountriesListComponent ]
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
