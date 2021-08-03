import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MarketPlaceDiscountManagerComponent } from './market-place-discount-manager.component';

describe('MarketPlaceDiscountManagerComponent', () => {
  let component: MarketPlaceDiscountManagerComponent;
  let fixture: ComponentFixture<MarketPlaceDiscountManagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MarketPlaceDiscountManagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MarketPlaceDiscountManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
