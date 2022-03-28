import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveryPersionDetailComponent } from './delivery-persion-detail.component';

describe('DeliveryPersionDetailComponent', () => {
  let component: DeliveryPersionDetailComponent;
  let fixture: ComponentFixture<DeliveryPersionDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeliveryPersionDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeliveryPersionDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
