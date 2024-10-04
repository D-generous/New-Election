import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SessiontimeoutComponent } from './sessiontimeout.component';

describe('SessiontimeoutComponent', () => {
  let component: SessiontimeoutComponent;
  let fixture: ComponentFixture<SessiontimeoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SessiontimeoutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SessiontimeoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
