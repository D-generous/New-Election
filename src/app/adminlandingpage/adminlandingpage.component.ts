import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NavComponent } from '../nav/nav.component';
import { CandidatesuploadsComponent } from '../candidatesuploads/candidatesuploads.component';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CookiesService } from '../services/cookies.service';
import { EnvironmentService } from '../services/environment.service';
import * as CryptoJS from 'crypto-js';

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

  public secretKey = 'your_secret_key';
  decryptData(encryptedData: string): string {
    const bytes = CryptoJS.AES.decrypt(encryptedData, this.secretKey);
    return bytes.toString(CryptoJS.enc.Utf8);
  }
  // handleSessionTimeout() {
  //   alert('Session Timeout. Please log in again.');
  //   this.routes.navigate(['/signin']);
  // }

  getDataWithExpiry(): string | null {
    const storedData = localStorage.getItem('adfood');

    if (!storedData) {
      return null; // No data found
    }

    const parsedData = JSON.parse(storedData);
    const currentTime = new Date().getTime();

    // Check if the stored data has expired
    if (currentTime > parsedData.expiry) {
      alert("Session timeout")
      this.routes.navigate(['/adminsignin'])
      this.removeDataFromStorage(); // If expired, remove it
      return null;
    }

    // Decrypt the value using the secret key
    const decryptedValue = this.decryptData(parsedData.value);
    return decryptedValue; // Return the decrypted value
  }


  // Remove the data from localStorage
  removeDataFromStorage(): void {
    localStorage.removeItem('adfood');
  }

  getData() {
    
    const decryptedData = this.getDataWithExpiry();
    // if (decryptedData) {
    //   console.log('Decrypted Data:', decryptedData);
    // } else {
    //   console.log('No valid data found or data has expired.');
    // }

    

    let obj ={
      mynewfood: decryptedData,


    }
    // const 

    

    
    this.service.getAdmin(obj).subscribe((data:any)=>{
      this.admin = data

    })

    console.log(obj);
    
  
    // return parsedData.value;
    
  }

  public checkInterval:any

  ngOnInit(){
    this.service.adminDashboard().subscribe((data:any)=>{
      this.details = data

    })
    // this.http.get('http://localhost/Election/admindashboard.php').subscribe((data:any)=>{
    //   this.details = data
      
    // })

    this.getDataWithExpiry()
    this.getData()
    // this.checkadmin()
    this.startSessionTimeoutChecker()
    this.getStatus()

    this.checkInterval = setInterval(() => {
      this.getDataWithExpiry();
    }, 10000);
  }

  // checkadmin(){
  //   this.service.getAdmin().subscribe((data:any)=>{
  //     this.admin = data

  //   })
  //   // this.http.get('http://localhost/Election/adminuser.php', {withCredentials: true}).subscribe((data:any)=>{

  //   //   this.admin = data
      
  //   // })

  // }

  public token:any =''
  public sessionExpired:any =''
  
  startSessionTimeoutChecker() {
    const checkInterval = 10000; // Check every 10 seconds
  
    this.token = this.cookiesService.getAdminToken(); 
  
    // setInterval(() => {
    //   const isTokenExpired = this.cookiesService.isTokenAdminExpired(this.token);
  
    //   if (isTokenExpired && !this.sessionExpired) {
    //     this.sessionExpired = true; // Mark session as expired
    //     this.handleSessionTimeout();
    //   }
    // }, checkInterval);
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
