import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidatesuploadsComponent } from './candidatesuploads.component';

describe('CandidatesuploadsComponent', () => {
  let component: CandidatesuploadsComponent;
  let fixture: ComponentFixture<CandidatesuploadsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CandidatesuploadsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CandidatesuploadsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
