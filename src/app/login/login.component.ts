import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from '../core/user.service';
import { UserStoreService } from '../core/user-store.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less'],
})
export class LoginComponent implements OnInit {
  form: string = 'login';
  canSignUp: boolean = true;

  constructor(
    private router: Router,
    private userService: UserService,
    private userStoreService: UserStoreService
  ) {}

  ngOnInit(): void {
    if (
      this.userStoreService.user.init &&
      this.userStoreService.user.loggedIn
    ) {
      this.router.navigate(['/account']);
    }
    this.userService.getSettingSignUp().subscribe((data) => {
      if (data) {
        this.canSignUp = data.signUp;
      }
    });
    // window.grecaptcha.render('recaptcha', {
    //   sitekey: process.env.RECAPTCHA_KEY,
    //   theme: 'dark'
    // });
  }

  handleSubmit(e) {
    e.preventDefault();

    let recaptchaResponse = '';
    let newErrorMessage = [];

    const {
      email,
      username,
      password,
      passwordConfirm,
    } = this.userStoreService.user;

    if (email === undefined || email === '') {
      newErrorMessage.push('Please enter an email.');
    }
    if (this.form === 'login' || this.form === 'signUp') {
      if (password === undefined || password === '') {
        newErrorMessage.push('Please enter a password.');
      }
    }
    if (this.form === 'signUp') {
      if (password !== passwordConfirm) {
        newErrorMessage.push('Passwords do not match.');
      }
      if (password.length < 8) {
        newErrorMessage.push('Password must be at least 8 characters.');
      }
    }
    if (newErrorMessage.length > 0) {
      newErrorMessage.forEach((error) => {
        //toast.error(error);
      });
    } else {
      let data = {
        email: email,
        username: username,
        password: password,
        passwordConfirm: passwordConfirm,
        recaptchaResponse,
      };

      this.userService.submitLoginForm(this.form, data).subscribe((data) => {
        if (this.form === 'forgotPassword') {
          //toast.success('An email has been sent.');
        } else {
          data.loggedIn = true;
          this.userStoreService.user = data;
          this.router.navigate(['/account']);
        }
      });
    }
  }

  switchForm = (e) => {
    e.preventDefault();

    if (e.target.id === 'forgot-password') {
      this.form = 'forgotPassword';
    } else {
      this.form = this.form === 'login' ? 'signUp' : 'login';
    }
  };
}
