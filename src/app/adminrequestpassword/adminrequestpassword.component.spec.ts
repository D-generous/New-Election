import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminrequestpasswordComponent } from './adminrequestpassword.component';

describe('AdminrequestpasswordComponent', () => {
  let component: AdminrequestpasswordComponent;
  let fixture: ComponentFixture<AdminrequestpasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminrequestpasswordComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminrequestpasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
