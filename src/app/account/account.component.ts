import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';

import { UserStoreService } from '../core/user-store.service';
import { AccountEditComponent } from './account-edit/account-edit.component';
import { AccountCreatePostComponent } from './account-create/account-create-post.component';
import { UserService } from '../core/user.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.less'],
})
export class AccountComponent implements OnInit {
  activeEditField: string;

  constructor(
    private router: Router,
    public userStoreService: UserStoreService,
    public userService: UserService,
    public dialog: MatDialog
  ) {
    this.userStoreService.user$.subscribe((user) => {
      if (user.init && !user.loggedIn) this.router.navigate(['/login']);
    });
  }

  ngOnInit(): void {}

  editAccountField(e: Event, field: string) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = { editField: field };
    const dialogRef = this.dialog.open(AccountEditComponent, dialogConfig);
  }

  createNewPost(e: Event) {
    const dialogConfig = new MatDialogConfig();
    const dialogRef = this.dialog.open(
      AccountCreatePostComponent,
      dialogConfig
    );
  }

  logout(e: Event) {
    e.preventDefault();

    this.userService.logout();
  }
}
