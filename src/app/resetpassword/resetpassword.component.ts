import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EnvironmentService } from '../services/environment.service';

@Component({
  selector: 'app-resetpassword',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './resetpassword.component.html',
  styleUrl: './resetpassword.component.css'
})
export class ResetpasswordComponent {
  public userForm: any; 
  isChecked:any= false

  

  constructor(public http:HttpClient, private formbuilder: FormBuilder, public routes:Router, public service:EnvironmentService, private route: ActivatedRoute) {}

  userId: string | null = null;
  ngOnInit(): void {
    this.userForm = this.formbuilder.group({
      password: ['', [Validators.required, this.passwordValidator]],
      confirmPassword: ['', [Validators.required]],
    });


    
  }

  passwordValidator(control: FormControl): { [key: string]: boolean } | null {
    const value: string = control.value;
    const isValid = /^(?=.*[0-9])(?=.*[^A-Za-z0-9])/.test(value);
    return isValid ? null : { 'invalidPassword': true };
  }


  public msg0:any=''
  public msg1:any=''

  onSubmit(): void {

    if (this.userForm.value['password'] === this.userForm.value['confirmPassword']) {
      this.route.paramMap.subscribe(params => {
        this.userId = params.get('id');
      });
      
      
          let obj ={
            tok: this.userId,
            password:this.userForm.value['password'],   
          }
        
          this.service.userResetPassword(obj).subscribe((data:any)=>{
            console.log(data);
          })
      
    }
    else{
      this.msg0 = "Passwords does not match"
      this.showMessageWithTimeout(this.msg0, 3000)
    }
    
    this.userForm.reset()
  }

  public showMsg = false

  showMessageWithTimeout(message: string, duration: number) {
    this.showMsg = true;

    setTimeout(() => {
      this.hideMessage();
    }, duration)

  }

  hideMessage() {
    this.msg0 = '';
    this.msg1 = '';
    this.showMsg = false
  }

}
