import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { UserService } from './user.service';
import { User } from '../shared/interfaces';

@Injectable({ providedIn: 'root' })
export class UserStoreService {
  constructor(private userService: UserService) {}
  private readonly _user = new BehaviorSubject<User>({
    id: 0,
    email: '',
    username: '',
    bio: '',
    password: '',
    passwordConfirm: '',
    loggedIn: false,
    admin: false,
    init: false,
    favorites: [],
  });

  readonly user$ = this._user.asObservable();

  get user(): User {
    return this._user.getValue();
  }

  set user(val: User) {
    this._user.next(val);
  }

  setProp(name: string, val: any): void {
    let user = this.user;

    user[name] = val;
    this._user.next(this.user);
  }
}
