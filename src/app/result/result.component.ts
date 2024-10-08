import { Component } from '@angular/core';
import { CandidatesuploadsComponent } from '../candidatesuploads/candidatesuploads.component';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { HttpClient } from '@angular/common/http';
import { EnvironmentService } from '../services/environment.service';

@Component({
  selector: 'app-result',
  standalone: true,
  imports: [CommonModule, MatTableModule, CandidatesuploadsComponent],
  templateUrl: './result.component.html',
  styleUrl: './result.component.css'
})
export class ResultComponent {
  sideNavOpen = false;

  toggleSideNav() {
    this.sideNavOpen = !this.sideNavOpen;
  }
  constructor(public http: HttpClient, public service: EnvironmentService) { }

  public results: any[] = []
  public msg: any = ''

  ngOnInit() {

    this.service.resultDisplay().subscribe((data: any) => {
      if (data.status === true) {
        this.results = data.candidates;

      } else {
        this.msg = data.message

      }

    })
  }


}
