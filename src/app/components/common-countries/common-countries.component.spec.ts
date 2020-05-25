import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonCountriesComponent } from './common-countries.component';

describe('CommonCountriesComponent', () => {
  let component: CommonCountriesComponent;
  let fixture: ComponentFixture<CommonCountriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommonCountriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommonCountriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
