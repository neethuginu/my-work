import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LicenseManageWidgetComponent } from './license-manage-widget.component';

describe('LicenseManageWidgetComponent', () => {
  let component: LicenseManageWidgetComponent;
  let fixture: ComponentFixture<LicenseManageWidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LicenseManageWidgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LicenseManageWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
