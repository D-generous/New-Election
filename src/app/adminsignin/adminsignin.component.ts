import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import { Router } from '@angular/router';
import { EnvironmentService } from '../services/environment.service';

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
      this.message = response.message

      if (response.token) {
        // Set the token in the cookie and navigate to dashboard
        document.cookie = `adminjwt_token=${response.token}; path=/;`;  // Add HttpOnly flag if using backend to set
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
