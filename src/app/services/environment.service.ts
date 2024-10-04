import { Injectable } from '@angular/core';
import { environment } from '../../environment/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EnvironmentService {

  constructor(public http:HttpClient) { }
  public baseUrl = environment.apiUrl


  public signUpUser(obj:any){
    return this.http.post<any>(`${this.baseUrl}signup.php`, obj)
  }
  public signInUser(obj:any){
    return this.http.post<any>(`${this.baseUrl}signin.php`, obj, { withCredentials: true })
  }
  public userDashboard(obj:any){
    return this.http.post<any>(`${this.baseUrl}dashboard.php`, obj, { withCredentials: true })
  }
  public userRequestPassword(obj:any){
    return this.http.post<any>(`${this.baseUrl}sendemail.php`, obj)
  }
  public userResetPassword(obj:any){
    return this.http.post<any>(`${this.baseUrl}resetpassword.php`, obj)
  }
  public getUserDashboard(){
    return this.http.get<any>(`${this.baseUrl}dashboard.php`, { withCredentials: true })
  }
  public getDetails(){
    return this.http.get<any>(`${this.baseUrl}user.php`, { withCredentials: true })
  }
  public accreditedVoter(obj:any){
    return this.http.post<any>(`${this.baseUrl}accreditedvoter.php`, obj)
  }
  public adminRequestPassword(obj:any){
    return this.http.post<any>(`${this.baseUrl}adminsendemail.php`, obj)
  }
  public adminResetPassword(obj:any){
    return this.http.post<any>(`${this.baseUrl}adminresetpassword.php`, obj)
  }
  public adminSignUp(obj:any){
    return this.http.post<any>(`${this.baseUrl}adminsignup.php`, obj)
  }
  public adminSignIn(obj:any){
    return this.http.post<any>(`${this.baseUrl}adminsignin.php`, obj, { withCredentials: true })
  }
  public candidateUpload(formdata:any){
    return this.http.post<any>(`${this.baseUrl}candidateupload.php`, formdata)
  }
  public resultDisplay(){
    return this.http.get<any>(`${this.baseUrl}result.php`)
  }
  public electionStatus(){
    return this.http.get<any>(`${this.baseUrl}electionstatus.php`)
  }
  public getStatus(){
    return this.http.get<any>(`${this.baseUrl}statusdisplay.php`)
  }
  public getAdmin(){
    return this.http.get<any>(`${this.baseUrl}adminuser.php`, { withCredentials: true })
  }
  public adminDashboard(){
    return this.http.get<any>(`${this.baseUrl}admindashboard.php`)
  }
  public landingPage(){
    return this.http.get<any>(`${this.baseUrl}landingpage.php`)
  }

}
