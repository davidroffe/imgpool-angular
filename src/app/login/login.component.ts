import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';

import { UserService } from '../core/user.service';
import { UserStoreService } from '../core/user-store.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less'],
})
export class LoginComponent implements OnInit {
  form: string = 'login';
  formSubmitButtonLabel: string = 'LOGIN';
  canSignUp: boolean = true;
  loginForm: FormGroup;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
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
    this.loginForm = this.formBuilder.group({
      email: '',
      username: '',
      password: '',
      passwordConfirm: '',
      //recaptchaResponse,
    });
    // window.grecaptcha.render('recaptcha', {
    //   sitekey: process.env.RECAPTCHA_KEY,
    //   theme: 'dark'
    // });
  }

  handleSubmit(e: Event, formValue) {
    e.preventDefault();

    let recaptchaResponse = '';
    let newErrorMessage = [];
    console.log(formValue);

    if (
      this.loginForm.get('email').value === undefined ||
      this.loginForm.get('email').value === ''
    ) {
      newErrorMessage.push('Please enter an email.');
    }
    if (this.form === 'login' || this.form === 'signUp') {
      if (
        this.loginForm.get('password').value === undefined ||
        this.loginForm.get('password').value === ''
      ) {
        newErrorMessage.push('Please enter a password.');
      }
    }
    if (this.form === 'signUp') {
      if (
        this.loginForm.get('password').value !==
        this.loginForm.get('passwordConfirm').value
      ) {
        newErrorMessage.push('Passwords do not match.');
      }
      if (this.loginForm.get('password').value.length < 8) {
        newErrorMessage.push('Password must be at least 8 characters.');
      }
    }
    if (newErrorMessage.length > 0) {
      newErrorMessage.forEach((error) => {
        //toast.error(error);
        console.log(error);
      });
    } else {
      let data = {
        email: this.loginForm.get('email').value,
        username: this.loginForm.get('username').value,
        password: this.loginForm.get('password').value,
        passwordConfirm: this.loginForm.get('passwordConfirm').value,
        recaptchaResponse,
      };

      this.userService.submitLoginForm(this.form, data).subscribe((data) => {
        if (this.form === 'forgotPassword') {
          //toast.success('An email has been sent.');
        } else {
          this.userStoreService.user = data;
          this.userStoreService.setProp('loggedIn', true);
          this.router.navigate(['/account']);
        }
      });
    }
  }

  switchForm(e: Event) {
    e.preventDefault();

    const switchFormButton = e.target as HTMLInputElement;

    if (switchFormButton.id === 'forgot-password') {
      this.form = 'forgotPassword';
    } else {
      this.form = this.form === 'login' ? 'signUp' : 'login';
    }
    switch (this.form) {
      case 'login':
        this.formSubmitButtonLabel = 'LOGIN';
        break;
      case 'signUp':
        this.formSubmitButtonLabel = 'SIGN UP';
        break;
      case 'forgotPassword':
        this.formSubmitButtonLabel = 'SEND EMAIL';
        break;
      default:
        break;
    }
  }
}
