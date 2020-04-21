import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { TagMenuComponent } from './tag-menu/tag-menu.component';

@NgModule({
  declarations: [TagMenuComponent],
  imports: [CommonModule, RouterModule],
  exports: [TagMenuComponent],
})
export class TagModule {}
