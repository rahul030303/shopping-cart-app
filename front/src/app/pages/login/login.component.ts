import { Component, OnInit } from '@angular/core';
import { AuthService } from "angularx-social-login";
import { FacebookLoginProvider, GoogleLoginProvider } from "angularx-social-login";
import { FormGroup,FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router'; 
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService,private fb:FormBuilder,private router:Router,private lser: LoginService) { }

  // signInWithGoogle(): void {
  //   this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
  //   // alert('hello');
  // }
  // signInWithFB(): void {
  //   this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
  // } 

  userlogin:FormGroup
  resData;
  errMsg;

  ngOnInit() {
    // this.authService.authState.subscribe((user) => 
    // {
    //   console.log(user);
    
    // });
    this.validate()
  }

  register(){
    this.router.navigate(['/register'])
  }

  loginData()
  {
    let formData=this.userlogin.getRawValue();
    // let form1 = this.loginForm.get('email').value;
    // console.log(formData.email)
    // console.log(form1)
    // console.log(formData)
    this.lser.userLogin(formData)
    .subscribe(res=>
      {
        this.resData=res;
        if(this.resData.err==0)
        {
          localStorage.setItem('userid',this.resData.uid);
          this.router.navigate(['/myCart']);
          console.log(this.resData);
        }
        if(this.resData.err==1)
        {
          this.errMsg=this.resData.msg;
        }
      })
  }

  validate(){
    this.userlogin=this.fb.group(
      {
        'email':['',[Validators.required,Validators.email]],
        'password':['',[Validators.required,Validators.minLength(6)]]
      }
    )
  }
}