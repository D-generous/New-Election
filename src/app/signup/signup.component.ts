import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { Router } from '@angular/router';
import { EnvironmentService } from '../services/environment.service';


@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, MatCheckboxModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  public userForm: any; 
  isChecked:any= false
  

  constructor(public http:HttpClient, private formbuilder: FormBuilder, public routes:Router, public service: EnvironmentService) {}

  ngOnInit(): void {
    this.userForm = this.formbuilder.group({
      name: ['', Validators.required],
      lname: ['', Validators.required],
      statecode: ['', [Validators.required, Validators.maxLength(4)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, this.passwordValidator]],
      agree: [false, Validators.requiredTrue] 
    });
  }
  passwordValidator(control: FormControl): { [key: string]: boolean } | null {
    const value: string = control.value;
    const isValid = /^(?=.*[0-9])(?=.*[^A-Za-z0-9])/.test(value);
    return isValid ? null : { 'invalidPassword': true };
  }

  get statecode() {
    return this.userForm.get('statecode');
  }

  public msg:any=''

  onSubmit(): void {
    

    let obj ={
      name:this.userForm.value['name'],
      lname:this.userForm.value['lname'],
      statecode:this.userForm.value['statecode'],
      email:this.userForm.value['email'],
      password:this.userForm.value['password'],

    }


    this.service.signUpUser(obj).subscribe((data:any)=>{
      this.msg = data
      this.showMessageWithTimeout(this.msg, 3000)
      // console.log(data);
      

      if (data.status===true) {
        alert("Registration Successfull")
        this.routes.navigate(['/signin'])
        
      }

    })
    // this.http.post('https://dgen.com.ng/Election/signup.php', obj).subscribe((data:any)=>{
    //   this.msg = data
    //   console.log(data);
      

    //   if (data.status===true) {
    //     this.routes.navigate(['/signin'])
        
    //   }

      
    // })
    
  }

  public showMsg = false

  showMessageWithTimeout(message: string, duration: number) {
    this.showMsg = true;

    setTimeout(() => {
      this.hideMessage();
    }, duration)

  }

  hideMessage() {
    this.msg = '';
    this.showMsg = false
  }
}
