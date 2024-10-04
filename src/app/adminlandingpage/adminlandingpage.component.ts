import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NavComponent } from '../nav/nav.component';
import { CandidatesuploadsComponent } from '../candidatesuploads/candidatesuploads.component';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CookiesService } from '../services/cookies.service';
import { EnvironmentService } from '../services/environment.service';

@Component({
  selector: 'app-adminlandingpage',
  standalone: true,
  imports: [CommonModule, NavComponent, CandidatesuploadsComponent],
  templateUrl: './adminlandingpage.component.html',
  styleUrl: './adminlandingpage.component.css'
})
export class AdminlandingpageComponent {
  sideNavOpen = false;

  toggleSideNav() {
    this.sideNavOpen = !this.sideNavOpen;
  }

  constructor(private router: Router, public http:HttpClient, public cookiesService:CookiesService, public routes:Router, public service:EnvironmentService) {}

  mobileMenuVisible: boolean = false;

  // Method to toggle mobile menu
  toggleMobileMenu(): void {
    this.mobileMenuVisible = !this.mobileMenuVisible;
  }

  details:any[] =[]
  admin:any =''
  ngOnInit(){
    this.service.adminDashboard().subscribe((data:any)=>{
      this.details = data

    })
    // this.http.get('http://localhost/Election/admindashboard.php').subscribe((data:any)=>{
    //   this.details = data
      
    // })

    this.checkadmin()
    this.startSessionTimeoutChecker()
    this.getStatus()
  }

  checkadmin(){
    this.service.getAdmin().subscribe((data:any)=>{
      this.admin = data

    })
    // this.http.get('http://localhost/Election/adminuser.php', {withCredentials: true}).subscribe((data:any)=>{

    //   this.admin = data
      
    // })

  }

  public token:any =''
  public sessionExpired:any =''
  
  startSessionTimeoutChecker() {
    const checkInterval = 10000; // Check every 10 seconds
  
    this.token = this.cookiesService.getAdminToken(); 
  
    setInterval(() => {
      const isTokenExpired = this.cookiesService.isTokenAdminExpired(this.token);
  
      if (isTokenExpired && !this.sessionExpired) {
        this.sessionExpired = true; // Mark session as expired
        this.handleSessionTimeout();
      }
    }, checkInterval);
  }
  
  handleSessionTimeout() {
    alert('Session Timeout. Please log in again.');
    this.routes.navigate(['/adminsignin']);
  }

  public msg: any
  statusOfElection(){

    this.service.electionStatus().subscribe((data:any)=>{
      alert(data)

    })


    // this.http.get('https://dgen.com.ng/Election/electionstatus.php').subscribe((data:any)=>{
    //   alert(data)
      
    // })

  }
  getStatus(){
    this.service.getStatus().subscribe((data:any)=>{
      this.msg = data

    })
    // this.http.get('https://dgen.com.ng/Election/statusdisplay.php').subscribe((data:any)=>{
      
    //   this.msg = data
      
    // })

  }

}
