import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AppService } from '../app.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  LoginForm: FormGroup
  show: boolean;
  remberMe: any

  constructor(
    private route: Router,
    private cookieService: CookieService,
    private spinner: NgxSpinnerService,
    public spinnerService: Ng4LoadingSpinnerService,
    private service: AppService
  ) { this.show = false }

  ngOnInit() {
    this.LoginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,3}))$/)]),
      remberMe: new FormControl('', []),
      password: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(16)]),
    });
    this.LoginForm.patchValue({
      email: this.cookieService.get('Email'),
      password: this.cookieService.get('Password'),
      remberMe: this.cookieService.check('CheckBox')
    })

  }

  loginFunction(loginData) {
    if (this.LoginForm.invalid) {
      return
    }
    if (loginData.remberMe == false) {
      this.cookieService.delete('Email');
      this.cookieService.delete('Password');
      this.cookieService.delete('CheckBox');
    }

    if (loginData.remberMe == true) {
      this.cookieService.set('Email', loginData.email);
      this.cookieService.set('Password', loginData.password);
      this.cookieService.set('CheckBox', loginData.remberMe);
    }
    let apiData = {
      "email": loginData.email,
      "password": loginData.password
    }
    this.spinner.show();
    this.service.postApi('/api/v1/admin/adminLogin', apiData, 0).subscribe((success) => {
      if (success.response_code == 200) {
        localStorage.setItem('LOGINTOKEN', success.Data.jwtToken);
        localStorage.setItem("_id", success.Data._id)
        localStorage.setItem("name", success.Data.name)
        localStorage.setItem("userType", success.Data.userType)
        localStorage.setItem("userManagement", success.Data.permission[0].userManagement)
        localStorage.setItem("orderManagement", success.Data.permission[0].orderManagement)
        localStorage.setItem("ratingManagement", success.Data.permission[0].ratingManagement)
        localStorage.setItem("staticManagement", success.Data.permission[0].staticManagement)
        localStorage.setItem("bankManagement", success.Data.permission[0].bankManagement)
        localStorage.setItem("settingManagement", success.Data.permission[0].settingManagement)
        localStorage.setItem("profilePic", success.Data.profilePic)
        this.spinner.hide();
        this.service.succ(success.response_message)
        this.route.navigate(['/admin/dashboard'])

      }
      else {
        if (success.response_code == 500) {
          this.service.err(success.response_message)
          this.spinner.hide();
        } else {
          this.spinner.hide();
          this.service.err(success.response_message)
        }
      }
    }, error => {
      this.service.err("something went wrong")
      this.spinner.hide();
    })
  }

  forgotPassword() {
    this.route.navigate(['/forgotPassword'])
  }

  password() {
    this.show = !this.show;
  }
}
