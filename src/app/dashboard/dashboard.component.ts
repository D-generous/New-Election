import { Component, inject, signal } from '@angular/core';
import { FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BreakpointObserver } from '@angular/cdk/layout';
import { StepperOrientation, MatStepperModule } from '@angular/material/stepper';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AsyncPipe, CommonModule } from '@angular/common';
import { HttpClient} from '@angular/common/http';
import { MatRadioModule } from '@angular/material/radio';
import { Router } from '@angular/router';
import { CookiesService } from '../services/cookies.service';
import { VotesuccessComponent } from "../votesuccess/votesuccess.component";
import { EnvironmentService } from '../services/environment.service';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [MatRadioModule, MatFormFieldModule, MatStepperModule, MatIconModule, MatInputModule, MatButtonModule, ReactiveFormsModule, CommonModule, AsyncPipe, VotesuccessComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  private _formBuilder = inject(FormBuilder);
  private breakpointObserver = inject(BreakpointObserver);

  public candidates: any[] = []

  firstFormGroup = this._formBuilder.group({
    gender: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    gender: ['', Validators.required],
  });
  thirdFormGroup = this._formBuilder.group({
    gender: ['', Validators.required],
  });
  fouthFormGroup = this._formBuilder.group({
    gender: ['', Validators.required],
  });
  fiveFormGroup = this._formBuilder.group({
    gender: ['', Validators.required],
  });
  sixFormGroup = this._formBuilder.group({
    gender: ['', Validators.required],
  });
  sevenFormGroup = this._formBuilder.group({
    gender: ['', Validators.required],
  });
  eightFormGroup = this._formBuilder.group({
    gender: ['', Validators.required],
  });
  nineFormGroup = this._formBuilder.group({
    gender: ['', Validators.required],
  });
  tenFormGroup = this._formBuilder.group({
    gender: ['', Validators.required],
  });
  stepperOrientation: Observable<StepperOrientation>;


  constructor(public formbuilder: FormBuilder, public http: HttpClient, public routes: Router, public cookiesService: CookiesService, public service:EnvironmentService) {

    this.stepperOrientation = this.breakpointObserver
      .observe('(min-width: 800px)')
      .pipe(map(({ matches }) => (matches ? 'horizontal' : 'vertical')));


  }




  public signinForm: any
  public email: any = ''
  public pass: any = ''

  public storageCandidates: any[] = []
  public message: any = ''
  public token: any = ''
  public voterId: any = ''
  public voterMsg: any = ''
  public isModalOpen = false

  public sessionExpired = false;

  startSessionTimeoutChecker() {
    const checkInterval = 10000;

    this.token = this.cookiesService.getToken();

    // setInterval(() => {
    //   const isTokenExpired = this.cookiesService.isTokenExpired(this.token);

    //   if (isTokenExpired && !this.sessionExpired) {
    //     this.sessionExpired = true;
    //     this.handleSessionTimeout();
    //   }
    // }, checkInterval);
  }

  handleSessionTimeout() {
    alert('Session Timeout. Please log in again.');
    this.routes.navigate(['/signin']);
  }


  userId: any = ''

  getCandidates() {

    this.service.getUserDashboard().subscribe((response:any)=>{
      console.log(response);
      
      this.candidates = response;

    },
    (error) => {
      this.displayError(error)

    }
  );

    // this.http.get('http://localhost/Election/dashboard.php', { withCredentials: true })
    //   .subscribe(
    //     (response: any) => {
    //       this.candidates = response;

    //     },
    //     (error) => {
    //       this.displayError(error)

    //     }
    //   );

  }
  public secretKey = 'your_secret_key';
  decryptData(encryptedData: string): string {
    const bytes = CryptoJS.AES.decrypt(encryptedData, this.secretKey);
    return bytes.toString(CryptoJS.enc.Utf8);
  }
  // handleSessionTimeout() {
  //   alert('Session Timeout. Please log in again.');
  //   this.routes.navigate(['/signin']);
  // }

  getDataWithExpiry(): string | null {
    const storedData = localStorage.getItem('food');

    if (!storedData) {
      return null; // No data found
    }

    const parsedData = JSON.parse(storedData);
    const currentTime = new Date().getTime();

    // Check if the stored data has expired
    if (currentTime > parsedData.expiry) {
      alert("Session timeout")
      this.routes.navigate(['/signin'])
      this.removeDataFromStorage(); // If expired, remove it
      return null;
    }

    // Decrypt the value using the secret key
    const decryptedValue = this.decryptData(parsedData.value);
    return decryptedValue; // Return the decrypted value
  }


  // Remove the data from localStorage
  removeDataFromStorage(): void {
    localStorage.removeItem('food');
  }

  getData() {
    
    const decryptedData = this.getDataWithExpiry();
    if (decryptedData) {
      console.log('Decrypted Data:', decryptedData);
    } else {
      console.log('No valid data found or data has expired.');
    }

    

    let obj ={
      mynewfood: decryptedData,


    }
    // const 

    

    
      this.service.getDetails(obj).subscribe((data:any)=>{
        console.log(data);
        
        this.voterName = data.fullname
        this.voterCode = data.statecode
  
      })

    console.log(obj);
    
  
    // return parsedData.value;
    
  }

  public checkInterval:any
  ngOnInit(): void {

    this.startSessionTimeoutChecker()
    this.getCandidates()
    // this.getUserDetails()

    this.getData()
    this.getDataWithExpiry()
    

    this.checkInterval = setInterval(() => {
      this.getDataWithExpiry();
    }, 10000); 

  }

  displayError(error: any) {
    if (error.error && error.error.message) {
      this.message = error.error.message;
    } else {
      this.message = 'An unexpected error occurred. Please try again.';
    }
  }




  onSubmit() {
    if (this.firstFormGroup.valid && this.secondFormGroup.valid && this.thirdFormGroup.valid && this.fouthFormGroup.valid && this.fiveFormGroup.valid && this.sixFormGroup.valid && this.sevenFormGroup.valid && this.eightFormGroup.valid && this.nineFormGroup.valid && this.tenFormGroup.valid) {
      let obj = {
        'votercode': this.voterCode,
        'president': this.firstFormGroup.value['gender'],
        'vice_president': this.secondFormGroup.value['gender'],
        'gensecretary': this.thirdFormGroup.value['gender'],
        'assgensecretary': this.fouthFormGroup.value['gender'],
        'fin_secretary': this.fiveFormGroup.value['gender'],
        'electoralofficer1': this.sixFormGroup.value['gender'],
        'electoralofficer2': this.sevenFormGroup.value['gender'],
        'profficer': this.eightFormGroup.value['gender'],
        'projectmanager': this.nineFormGroup.value['gender'],
        'welfareofficer': this.tenFormGroup.value['gender'],
      }

      // console.log(obj);

      this.service.userDashboard(obj).subscribe((data:any)=>{

        if (data.status === true) {
          this.isModalOpen = true

        }
        else {
          this.voterMsg = data.message
          this.showMessageWithTimeout(this.voterMsg, 3000)
        }
      })


      
      // this.http.post('https://dgen.com.ng/Election/dashboard.php', obj, { withCredentials: true }).subscribe((data: any) => {
      //   if (data.status === true) {
      //     this.isModalOpen = true

      //   }
      //   else {
      //     this.voterMsg = data.message
      //   }

      // })
    } else {
      this.voterMsg = "All steps must be selected"
      this.showMessageWithTimeout(this.voterMsg, 3000)
      console.log('Form is not valid');
    }

  }

  public voterName: any = ''
  public voterCode: any = ''

  // getUserDetails() {
  //   this.service.getDetails().subscribe((data:any)=>{
  //     this.voterName = data.fullname
  //     this.voterCode = data.statecode

  //   })
  //   // this.http.get('http://localhost/Election/user.php', { withCredentials: true }).subscribe((data: any) => {

  //   //   this.voterName = data.fullname
  //   //   this.voterCode = data.statecode

  //   // })

  // }


  public showMsg = false

  showMessageWithTimeout(message: string, duration: number) {
    this.showMsg = true;

    setTimeout(() => {
      this.hideMessage();
    }, duration)

  }

  hideMessage() {
    this.voterMsg= '';
    // this.msg1 = '';
    this.showMsg = false
  }
  
  closeModal() {

    this.routes.navigate(['/'])

  }


  hide = signal(true);
  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

}
