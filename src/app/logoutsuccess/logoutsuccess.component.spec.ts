import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogoutsuccessComponent } from './logoutsuccess.component';

describe('LogoutsuccessComponent', () => {
  let component: LogoutsuccessComponent;
  let fixture: ComponentFixture<LogoutsuccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LogoutsuccessComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LogoutsuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
