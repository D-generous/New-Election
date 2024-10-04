import { Component } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { NavComponent } from '../nav/nav.component';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CookiesService } from '../services/cookies.service';
@Component({
  selector: 'app-candidatesuploads',
  standalone: true,
  imports: [NavComponent, CommonModule, MatSidenavModule, MatButtonModule, MatIconModule, MatListModule, MatCardModule],
  templateUrl: './candidatesuploads.component.html',
  styleUrl: './candidatesuploads.component.css'
})
export class CandidatesuploadsComponent {
  constructor(private router: Router, public http:HttpClient, public routes:Router, public logoutservice: CookiesService) {}

  mobileMenuVisible: boolean = false;

  toggleMobileMenu(): void {
    this.mobileMenuVisible = !this.mobileMenuVisible;
  }

 logout(){
  this.logoutservice.logoutAdmin()
 }


}
