import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';

import { AccountRoutingModule } from './account-routing.module';
import { AccountComponent } from './account.component';
import { AccountCreatePostComponent } from './account-create/account-create-post.component';
import { AccountEditComponent } from './account-edit/account-edit.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    AccountComponent,
    AccountEditComponent,
    AccountCreatePostComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    AccountRoutingModule,
    SharedModule,
  ],
})
export class AccountModule {}
