import { Component, OnInit, Input, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { UserService } from 'src/app/core/user.service';
import { UserStoreService } from 'src/app/core/user-store.service';

@Component({
  selector: 'app-account-edit',
  templateUrl: './account-edit.component.html',
})
export class AccountEditComponent implements OnInit {
  @Input() editField: string;
  editAccountForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<AccountEditComponent>,
    private userService: UserService,
    private userStoreService: UserStoreService
  ) {
    this.editField = this.data.editField;
  }

  ngOnInit(): void {
    this.editAccountForm = this.formBuilder.group({
      editField: this.editField,
      username: '',
      email: '',
      password: '',
      passwordConfirm: '',
      bio: '',
    });
  }

  close() {
    this.dialogRef.close();
  }

  handleSubmit(e: Event) {
    e.preventDefault();

    let newErrorMessage = [];

    if (this.editField === 'edit-email') {
      if (
        this.editAccountForm.get('email').value === undefined ||
        this.editAccountForm.get('email').value === ''
      ) {
        newErrorMessage.push('Please enter an email.');
      } else if (
        this.editAccountForm.get('email').value ===
        this.userStoreService.user.email
      ) {
        newErrorMessage.push('Please use a different email.');
      }
    }
    if (this.editField === 'edit-username') {
      if (
        this.editAccountForm.get('username').value === undefined ||
        this.editAccountForm.get('username').value === ''
      ) {
        newErrorMessage.push('Please enter a username.');
      } else if (
        this.editAccountForm.get('username').value ===
        this.userStoreService.user.username
      ) {
        newErrorMessage.push('Please use a different username.');
      }
    }
    if (this.editField === 'edit-bio') {
      if (this.editAccountForm.get('bio').value === undefined) {
        newErrorMessage.push('Error with bio.');
      }
    }
    if (this.editField === 'edit-password') {
      if (
        this.editAccountForm.get('password').value === undefined ||
        this.editAccountForm.get('password').value === ''
      ) {
        newErrorMessage.push('Please enter a password.');
      } else if (this.editAccountForm.get('password').value.length < 8) {
        newErrorMessage.push('Password must be at least 8 characters.');
      } else if (
        this.editAccountForm.get('passwordConfirm').value !==
        this.editAccountForm.get('password').value
      ) {
        newErrorMessage.push('Passwords do not match.');
      }
    }
    if (newErrorMessage.length > 0) {
      newErrorMessage.forEach((error) => {
        //toast.error(error);
      });
    } else {
      console.log(this.editAccountForm.value);

      this.userService
        .editAccount(this.editAccountForm.value)
        .subscribe((data) => {
          if (data.status === 'success') {
            data.loggedIn = true;
            data.init = true;
            this.userStoreService.user = data;
            this.editAccountForm.reset();
            this.close();
          }
        });
    }
  }
}
