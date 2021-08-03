import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyAppsComponent } from './company-apps.component';

describe('CompanyAppsComponent', () => {
  let component: CompanyAppsComponent;
  let fixture: ComponentFixture<CompanyAppsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanyAppsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyAppsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
