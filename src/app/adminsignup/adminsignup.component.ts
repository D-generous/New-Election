import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { Router } from '@angular/router';
import { EnvironmentService } from '../services/environment.service';

@Component({
  selector: 'app-adminsignup',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatCheckboxModule],
  templateUrl: './adminsignup.component.html',
  styleUrl: './adminsignup.component.css'
})
export class AdminsignupComponent {

  public userForm: any; 
  isChecked:any= false
  

  constructor(public http:HttpClient, private formbuilder: FormBuilder, public routes:Router, public service:EnvironmentService) {}

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

  public msg:any =''
  onSubmit(): void {
    

    let obj ={
      name:this.userForm.value['name'],
      lname:this.userForm.value['lname'],
      statecode:this.userForm.value['statecode'],
      email:this.userForm.value['email'],
      password:this.userForm.value['password'],

    }

    this.service.adminSignUp(obj).subscribe((data:any)=>{
      this.msg = data

      if (data.status===true) {
        this.routes.navigate(['/adminsignin'])
        
      }
    })
    
    // this.http.post('https://dgen.com.ng/Election//adminsignup.php', obj).subscribe((data:any)=>{

    //   this.msg = data

    //   if (data.status===true) {
    //     this.routes.navigate(['/adminsignin'])
        
    //   }
    // })
  
  }

}
