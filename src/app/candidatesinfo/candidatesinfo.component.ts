import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CandidatesuploadsComponent } from '../candidatesuploads/candidatesuploads.component';
import { HttpClient } from '@angular/common/http';
import { EnvironmentService } from '../services/environment.service';

@Component({
  selector: 'app-candidatesinfo',
  standalone: true,
  imports: [ CommonModule, ReactiveFormsModule, CandidatesuploadsComponent],
  templateUrl: './candidatesinfo.component.html',
  styleUrl: './candidatesinfo.component.css'
})
export class CandidatesinfoComponent {
  sideNavOpen = false;

  toggleSideNav() {
    this.sideNavOpen = !this.sideNavOpen;
  }

  form: any = ""

  constructor(private fb: FormBuilder, public http:HttpClient, public service: EnvironmentService) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      statecode: ['', [Validators.required]],
      picture: ['', [Validators.required]],
    });
  }

  selectedFile: any = ''

  candidatePicture(event: any) {

    this.selectedFile = event.target.files[0]

  }
  public msg0:any = ''
  public msg1:any = ''

  onSubmit() {



    if (this.form.valid) {
      const formdata = new FormData()
      formdata.append('file', this.selectedFile, this.selectedFile.name)
      formdata.append('name', this.form.value['name'])
      formdata.append('statecode', this.form.value['statecode'])

      this.service.candidateUpload(formdata).subscribe((data:any)=>{
        
        if (data.status === false) {
          this.msg0 = data.message
        this.showMessageWithTimeout(this.msg0, 3000)
        
      }
      else{
        
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
