import { HttpClient } from '@angular/common/http';
import { Component, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import { Router } from '@angular/router';
import { EnvironmentService } from '../services/environment.service';

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

  setCookieFromBackend() { 
    
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
      console.log( response); 
      this.message = response.message

      

      if (response.token) {
        // Set the token in the cookie and navigate to dashboard
        document.cookie = `jwt_token=${response.token}; path=/;`;  // Add HttpOnly flag if using backend to set
        this.routes.navigate(['/dashboard']);
      }

      
      
    }, 
    (error) => { 
      console.log( error); 
      this.message = error
    })


    // this.http.post('http://localhost/Election/signin.php',obj,{ withCredentials: true }).subscribe( 
    //   (response:any) => { 
    //     console.log( response); 
    //     this.message = response.message

        

    //     if (response.token) {
    //       // Set the token in the cookie and navigate to dashboard
    //       document.cookie = `jwt_token=${response.token}; path=/;`;  // Add HttpOnly flag if using backend to set
    //       this.routes.navigate(['/dashboard']);
    //     }

        
        
    //   }, 
    //   (error) => { 
    //     console.log( error); 
    //     this.message = error
    //   } 
    // ); 

    // this.http.post('http://localhost/Election/signin.php', obj).subscribe((data:any)=>{
    //   console.log(data);
      
    // })
    
  }


  hide = signal(true);
  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }


}
