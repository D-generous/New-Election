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
import * as CryptoJS from 'crypto-js';
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


  public secretKey = 'your_secret_key';
  decryptData(encryptedData: string): string {
    const bytes = CryptoJS.AES.decrypt(encryptedData, this.secretKey);
    return bytes.toString(CryptoJS.enc.Utf8);
  }
  

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
      this.logout(); // If expired, remove it
      return null;
    }

    // Decrypt the value using the secret key
    const decryptedValue = this.decryptData(parsedData.value);
    return decryptedValue; // Return the decrypted value
  }


  // Remove the data from localStorage
  // removeDataFromStorage(): void {
  //   localStorage.removeItem('food');
  // }

 logout(){
  alert("Log out successfull")
  localStorage.removeItem('adfood');
 }


}
