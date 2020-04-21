import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(private http: HttpClient) {}

  getSettingSignUp(): Observable<any> {
    const url = '/api/setting/signup';

    return this.http.get<any>(url);
  }

  submitLoginForm(form: string, data: object): Observable<any> {
    let url = '';

    switch (form) {
      case 'login':
        url = '/api/user/login';
        break;
      case 'signUp':
        url = '/api/user/signup';
        //recaptchaResponse = window.grecaptcha.getResponse();
        break;
      case 'forgotPassword':
        url = '/api/user/password-reset';
        break;
    }

    return this.http.post<any>(url, data);
  }
}
