import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidatesinfoComponent } from './candidatesinfo.component';

describe('CandidatesinfoComponent', () => {
  let component: CandidatesinfoComponent;
  let fixture: ComponentFixture<CandidatesinfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CandidatesinfoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CandidatesinfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
