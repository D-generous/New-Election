import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestpasswordComponent } from './requestpassword.component';

describe('RequestpasswordComponent', () => {
  let component: RequestpasswordComponent;
  let fixture: ComponentFixture<RequestpasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RequestpasswordComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RequestpasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
