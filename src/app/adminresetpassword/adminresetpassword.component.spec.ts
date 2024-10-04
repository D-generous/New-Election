import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminresetpasswordComponent } from './adminresetpassword.component';

describe('AdminresetpasswordComponent', () => {
  let component: AdminresetpasswordComponent;
  let fixture: ComponentFixture<AdminresetpasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminresetpasswordComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminresetpasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
