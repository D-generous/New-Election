import { HttpClient } from '@angular/common/http';
import { Component, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import { Router } from '@angular/router';
import { EnvironmentService } from '../services/environment.service';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [ReactiveFormsModule, MatIconModule, MatInputModule],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.css'
})
export class SigninComponent {
  public signinForm:any
  constructor(public formbuilder: FormBuilder, public http:HttpClient, public routes:Router, public service: EnvironmentService) {}
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
    localStorage.setItem('food', JSON.stringify(dataToStore));
  
    // Schedule deletion after the specified time
    setTimeout(() => {
      this.removeDataFromStorage();
    }, expiryTimeInSeconds * 1000);
  }
  
  // Remove the data from localStorage
  removeDataFromStorage(): void {
    localStorage.removeItem('food');
  }


public message:any=''
  onSubmit(){

    this.email= this.signinForm.value['email']
    this.pass= this.signinForm.value['pass']

    let obj ={
      email: this.email,
      pass: this.pass
    }
    console.log(obj);


    this.service.signInUser(obj).subscribe((response:any)=>{ 
      console.log( response.statecode); 
      // this.message = response.message
      const data = response.statecode

      const encrypted = this.encryptData(data);

      this.storeDataWithExpiry(encrypted, 60)

      if (response.status===true) {
        this.routes.navigate(['/dashboard']);
        
      }

      // console.log( response); 
      // this.message = response.message

      // this.showMessageWithTimeout(this.message, 3000)
      

      // if (response.token) {
      //   // Set the token in the cookie and navigate to dashboard
      //   document.cookie = `jwt_token=${response.token}; path=/;`;  // Add HttpOnly flag if using backend to set
      //   this.routes.navigate(['/dashboard']);
      // }

      
      
    }, 
    (error) => { 
      console.log( error); 
      this.message = error
    })

    
  }


  hide = signal(true);
  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  public showMsg = false

  showMessageWithTimeout(message: string, duration: number) {
    this.showMsg = true;

    setTimeout(() => {
      this.hideMessage();
    }, duration)

  }

  hideMessage() {
    this.message = '';
    this.showMsg = false
  }

}
