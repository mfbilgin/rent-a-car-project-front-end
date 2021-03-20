import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RentCarComponent } from './rent-car.component';

describe('RentCarComponent', () => {
  let component: RentCarComponent;
  let fixture: ComponentFixture<RentCarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RentCarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RentCarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
