import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { PostRoutingModule } from './post-routing.module';
import { PostSearchComponent } from './post-search/post-search.component';
import { PostListComponent } from './post-list/post-list.component';
import { PostSingleComponent } from './post-single/post-single.component';
import { TagModule } from '../tag/tag.module';

@NgModule({
  declarations: [PostSearchComponent, PostListComponent, PostSingleComponent],
  imports: [CommonModule, FormsModule, PostRoutingModule, TagModule],
  exports: [PostSearchComponent],
})
export class PostModule {}
