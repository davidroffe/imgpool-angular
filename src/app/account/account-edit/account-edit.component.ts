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
  @Input() activeField: string;
  editAccountForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<AccountEditComponent>,
    private userService: UserService,
    private userStoreService: UserStoreService
  ) {
    this.activeField = this.data.activeField;
    console.log(this.data);
  }

  ngOnInit(): void {
    this.editAccountForm = this.formBuilder.group({
      activeField: this.activeField,
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

    if (this.activeField === 'edit-email') {
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
    if (this.activeField === 'edit-username') {
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
    if (this.activeField === 'edit-bio') {
      if (this.editAccountForm.get('bio').value === undefined) {
        newErrorMessage.push('Error with bio.');
      }
    }
    if (this.activeField === 'edit-password') {
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
      this.userService.editAccount(this.editAccountForm).subscribe((data) => {
        if (data.status === 'success') {
          // props.dispatch(setUser('email', res.data.email));
          // props.dispatch(setUser('username', res.data.username));
          // props.dispatch(setUser('bio', res.data.bio));

          this.editAccountForm.reset();
        }
      });
    }
  }
}
