import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VyaTicketComponent } from './vya-ticket.component';

describe('VyaTicketComponent', () => {
  let component: VyaTicketComponent;
  let fixture: ComponentFixture<VyaTicketComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VyaTicketComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VyaTicketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
