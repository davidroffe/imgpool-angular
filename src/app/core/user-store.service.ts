import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Router, NavigationStart } from '@angular/router';

import { UserService } from './user.service';
import { User } from '../shared/interfaces';

@Injectable({ providedIn: 'root' })
export class UserStoreService {
  constructor(private router: Router, private userService: UserService) {
    router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.userService.isAuthorized().subscribe((data: any) => {
          if (data.valid) {
            data.loggedIn = true;
            data.init = true;
            this.user = data;
          } else {
            this.setProp('init', true);
          }
        });
      }
    });
  }
  private readonly _user = new BehaviorSubject<User>({
    id: 0,
    email: '',
    username: '',
    bio: '',
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
