import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PriceeditorComponent } from './priceeditor.component';

describe('PriceeditorComponent', () => {
  let component: PriceeditorComponent;
  let fixture: ComponentFixture<PriceeditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PriceeditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PriceeditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
