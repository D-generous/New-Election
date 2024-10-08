import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EnvironmentService } from '../services/environment.service';

@Component({
  selector: 'app-adminrequestpassword',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './adminrequestpassword.component.html',
  styleUrl: './adminrequestpassword.component.css'
})
export class AdminrequestpasswordComponent {
  public userForm: any; 
  isChecked:any= false
  

  constructor(public http:HttpClient, private formbuilder: FormBuilder, public routes:Router, public service:EnvironmentService) {}

  ngOnInit(): void {
    this.userForm = this.formbuilder.group({
      email: ['', [Validators.required, Validators.email]], 
    });
  }


  public msg0:any=''
  public msg1:any=''

  onSubmit(): void {
    

    let obj ={
      to:this.userForm.value['email'],


    }


  
    this.service.adminRequestPassword(obj).subscribe((data:any)=>{
      if (data.state===false) {
        this.msg0 = data.message
        this.showMessageWithTimeout(this.msg0, 3000)
        console.log(data);
        
        
      }else{
        this.msg1 = data.message
        this.showMessageWithTimeout(this.msg1, 5000)
        console.log(data);



      }

    })
    
    
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
