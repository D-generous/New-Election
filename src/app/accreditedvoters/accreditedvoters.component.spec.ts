import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccreditedvotersComponent } from './accreditedvoters.component';

describe('AccreditedvotersComponent', () => {
  let component: AccreditedvotersComponent;
  let fixture: ComponentFixture<AccreditedvotersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccreditedvotersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccreditedvotersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
