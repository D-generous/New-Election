import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CandidatesuploadsComponent } from '../candidatesuploads/candidatesuploads.component';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CookiesService } from '../services/cookies.service';
import { EnvironmentService } from '../services/environment.service';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-adminlandingpage',
  standalone: true,
  imports: [CommonModule, CandidatesuploadsComponent],
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
 

  getDataWithExpiry(): string | null {
    const storedData = localStorage.getItem('adfood');

    if (!storedData) {
      return null; 
    }

    const parsedData = JSON.parse(storedData);
    const currentTime = new Date().getTime();

    // Check if the stored data has expired
    if (currentTime > parsedData.expiry) {
      alert("Session timeout")
      this.routes.navigate(['/adminsignin'])
      this.removeDataFromStorage(); 
      return null;
    }

  
    const decryptedValue = this.decryptData(parsedData.value);
    return decryptedValue; 
  }


  removeDataFromStorage(): void {
    localStorage.removeItem('adfood');
  }

  getData() {
    
    const decryptedData = this.getDataWithExpiry();

    let obj ={
      mynewfood: decryptedData,


    }

    
    this.service.getAdmin(obj).subscribe((data:any)=>{
      this.admin = data

    })

    console.log(obj);
    
  }

  public checkInterval:any

  ngOnInit(){
    this.service.adminDashboard().subscribe((data:any)=>{
      this.details = data

    })


    this.getDataWithExpiry()
    this.getData()

    this.getStatus()

    this.checkInterval = setInterval(() => {
      this.getDataWithExpiry();
    }, 10000);
  }


  public token:any =''
  public sessionExpired:any =''
  
 

  public msg: any
  statusOfElection(){

    this.service.electionStatus().subscribe((data:any)=>{
      alert(data)

    })


  }
  getStatus(){
    this.service.getStatus().subscribe((data:any)=>{
      this.msg = data

    })

  }

}
