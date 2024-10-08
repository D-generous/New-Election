import { HttpClient } from '@angular/common/http';
import { Component, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
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
  public signinForm: any
  constructor(public formbuilder: FormBuilder, public http: HttpClient, public routes: Router, public service: EnvironmentService) { }
  public email: any = ''
  public pass: any = ''

  ngOnInit() {

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
    const expiryTime = currentTime + (expiryTimeInSeconds * 1000);

    const dataToStore = {
      value: data,
      expiry: expiryTime
    };

    localStorage.setItem('food', JSON.stringify(dataToStore));

    setTimeout(() => {
      this.removeDataFromStorage();
    }, expiryTimeInSeconds * 1000);
  }

  removeDataFromStorage(): void {
    localStorage.removeItem('food');
  }


  public message: any = ''
  onSubmit() {

    this.email = this.signinForm.value['email']
    this.pass = this.signinForm.value['pass']

    let obj = {
      email: this.email,
      pass: this.pass
    }


    this.service.signInUser(obj).subscribe((response: any) => {
      const data = response.statecode

      const encrypted = this.encryptData(data);

      this.storeDataWithExpiry(encrypted, 600)

      if (response.status === false) {
        this.message = response.message

        this.showMessageWithTimeout(this.message, 3000)

      } else {
        this.routes.navigate(['/dashboard']);

      }

    },
      (error) => {
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
