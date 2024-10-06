import { Routes } from '@angular/router';
import { LandingpageComponent } from './landingpage/landingpage.component';
import { SignupComponent } from './signup/signup.component';
import { SigninComponent } from './signin/signin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
// import { TestComponent } from './test/test.component';
// import { AdminlandinpageComponent } from './adminlandinpage/adminlandinpage.component';
import { CandidatesuploadsComponent } from './candidatesuploads/candidatesuploads.component';
import { CandidatesinfoComponent } from './candidatesinfo/candidatesinfo.component';
import { ResultComponent } from './result/result.component';
import { AccreditedvotersComponent } from './accreditedvoters/accreditedvoters.component';
import { loginguardGuard } from './guards/loginguard.guard';
import { AdminsignupComponent } from './adminsignup/adminsignup.component';
import { AdminsigninComponent } from './adminsignin/adminsignin.component';
import { authguardGuard } from './guards/authguard.guard';
import { LogoutComponent } from './logout/logout.component';
import { RequestpasswordComponent } from './requestpassword/requestpassword.component';
import { ResetpasswordComponent } from './resetpassword/resetpassword.component';
import { AdminrequestpasswordComponent } from './adminrequestpassword/adminrequestpassword.component';
import { AdminresetpasswordComponent } from './adminresetpassword/adminresetpassword.component';
import { ErrorpageComponent } from './errorpage/errorpage.component';
import { AdminlandingpageComponent } from './adminlandingpage/adminlandingpage.component';

export const routes: Routes = [
    {path:"", component:LandingpageComponent},
    {path:"signup", component:SignupComponent},
    {path:"signin", component:SigninComponent},
    {
        path:"dashboard", children:[
            {path:"", component:DashboardComponent},
            // {path:"test", component:TestComponent},
        ],canActivate:[loginguardGuard]
    },
    {path:"adminsignup", component:AdminsignupComponent},
    {path:"adminsignin", component:AdminsigninComponent},
    {path:"logout", component:LogoutComponent},
    {path:"requestpassword", component:RequestpasswordComponent},
    // {path:"passwordreset", component:ResetpasswordComponent},
    {path:"adminrequestpassword", component:AdminrequestpasswordComponent},
    {path:"adminpasswordreset/:id", component:AdminresetpasswordComponent},
    { path: 'passwordreset/:id', component:  ResetpasswordComponent},
    {
        path:"admin", children:[
            {path:'', component:AdminlandingpageComponent},
            {path:"accreditedvoters", component:AccreditedvotersComponent},
            {path:"uploadscandidatesinfo", component:CandidatesinfoComponent},
            {path:"result", component:ResultComponent},
            {path:"test2", component:CandidatesuploadsComponent},
        ], canActivate:[authguardGuard], 
    },

    {path:"**", component:ErrorpageComponent}
];
