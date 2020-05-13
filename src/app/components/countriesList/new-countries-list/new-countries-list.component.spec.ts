import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewCountriesListComponent } from './new-countries-list.component';

describe('NewCountriesListComponent', () => {
  let component: NewCountriesListComponent;
  let fixture: ComponentFixture<NewCountriesListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewCountriesListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewCountriesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
