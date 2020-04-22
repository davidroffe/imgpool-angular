import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { FormGroup } from '@angular/forms';

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
    let httpParams = new HttpParams();

    for (const field in data) {
      if (data.hasOwnProperty(field)) {
        const element = data[field];
        httpParams = httpParams.set(field, data[field]);
      }
    }

    return this.http.post<any>(url, {}, { params: httpParams });
  }

  editAccount(editAccountForm: FormGroup): Observable<any> {
    const url = '/api/user/edit';

    return this.http.post<any>(url, editAccountForm);
    // axios({
    //   url: url,
    //   method: 'post',
    //   params: {
    //     currentEmail: props.email,
    //     editField: editAccount.field,
    //     email: editAccount.email,
    //     username: editAccount.username,
    //     bio: editAccount.bio,
    //     password: editAccount.password,
    //     passwordConfirm: editAccount.passwordConfirm,
    //   },
    // })
    //   .then((res) => {

    //   })
    //   .catch((error) => {
    //     toast.error(error.response.data);
    //   });
  }
}
