import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import { Router } from '@angular/router';
import { EnvironmentService } from '../services/environment.service';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-adminsignin',
  standalone: true,
  imports: [ReactiveFormsModule, MatIconModule, MatInputModule, CommonModule],
  templateUrl: './adminsignin.component.html',
  styleUrl: './adminsignin.component.css'
})
export class AdminsigninComponent {
  public signinForm:any
  constructor(public formbuilder: FormBuilder, public http:HttpClient, public routes:Router, public service:EnvironmentService) {}
  public email:any=''
  public pass:any=''

  ngOnInit(){

    this.signinForm = this.formbuilder.group({
      email: ['', Validators.required],
      pass: ['', Validators.required],
    })
  }

  public secretKey = 'your_secret_key';


  encryptData(data: string): string {
    return CryptoJS.AES.encrypt(data, this.secretKey).toString();
  }
  storeDataWithExpiry(data: string, expiryTimeInSeconds: number): void {
    const currentTime = new Date().getTime();
    const expiryTime = currentTime + (expiryTimeInSeconds * 1000); // Convert seconds to milliseconds
  
    const dataToStore = {
      value: data,
      expiry: expiryTime
    };
  
    // Store the data and expiry time as JSON in localStorage
    localStorage.setItem('adfood', JSON.stringify(dataToStore));
  
    // Schedule deletion after the specified time
    setTimeout(() => {
      this.removeDataFromStorage();
    }, expiryTimeInSeconds * 1000);
  }
  
  // Remove the data from localStorage
  removeDataFromStorage(): void {
    localStorage.removeItem('adfood');
  }

  public message:any=''
  onSubmit(){

    // this.setCookieFromBackend()
    this.email= this.signinForm.value['email']
    this.pass= this.signinForm.value['pass']

    let obj ={
      email: this.email,
      pass: this.pass
    }
    

    this.service.adminSignIn(obj).subscribe((response:any)=>{ 
      
      console.log( response.statecode); 
      // this.message = response.message
      const data = response.statecode

      const encrypted = this.encryptData(data);

      this.storeDataWithExpiry(encrypted, 60)

      if (response.status===true) {
        this.routes.navigate(['/admin']);
        
      }
       
    }, 
    (error) => { 
      this.message = error
    } 
  ); 



    // this.http.post('http://localhost/Election/adminsignin.php',obj,{ withCredentials: true }).subscribe( 
    //   (response:any) => { 
    //     this.message = response.message

    //     if (response.token) {
    //       // Set the token in the cookie and navigate to dashboard
    //       document.cookie = `adminjwt_token=${response.token}; path=/;`;  // Add HttpOnly flag if using backend to set
    //       this.routes.navigate(['/admin']);
    //     }
         
    //   }, 
    //   (error) => { 
    //     this.message = error
    //   } 
    // ); 
    
  }



  hide = signal(true);
  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

}
