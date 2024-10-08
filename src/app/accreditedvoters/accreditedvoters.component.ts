import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { EnvironmentService } from '../services/environment.service';
import { CommonModule } from '@angular/common';
import { CandidatesuploadsComponent } from '../candidatesuploads/candidatesuploads.component';

@Component({
  selector: 'app-accreditedvoters',
  standalone: true,
  imports: [ CommonModule, ReactiveFormsModule, CandidatesuploadsComponent],
  templateUrl: './accreditedvoters.component.html',
  styleUrl: './accreditedvoters.component.css'
})
export class AccreditedvotersComponent {
  sideNavOpen = false;

  toggleSideNav() {
    this.sideNavOpen = !this.sideNavOpen;
  }

  form: any=""

  constructor(private fb: FormBuilder, public http:HttpClient, public service: EnvironmentService) {
    this.form = this.fb.group({
      statecode: ['', [Validators.required]],
    });
  }

  public msg0:any=''
  public msg1:any=''
  onSubmit() {
    if (this.form.valid) {
      let obj = {
        statecode: this.form.value['statecode']
      }

      this.service.accreditedVoter(obj).subscribe((data:any)=>{

        if (data.status===false) {
          this.msg0 = data.message
        this.showMessageWithTimeout(this.msg0, 3000)          
        }else{
          this.msg1 = data.message
        this.showMessageWithTimeout(this.msg1, 3000)
        }

      })

    } else {
      console.log('Form is not valid');
    }
    this.form.reset()
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
