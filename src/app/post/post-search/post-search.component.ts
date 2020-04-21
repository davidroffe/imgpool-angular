import { Component, OnInit } from '@angular/core';

import { PostService } from '../../core/post.service';
import { PostStoreService } from '../../core/post-store.service';

import { Post } from '../../shared/interfaces';

@Component({
  selector: 'app-post-search',
  templateUrl: './post-search.component.html',
  styleUrls: ['./post-search.component.less'],
})
export class PostSearchComponent implements OnInit {
  text: string = '';

  constructor(
    private postService: PostService,
    private postStoreService: PostStoreService
  ) {}

  ngOnInit(): void {}

  handleSubmit(e: Event) {
    e.preventDefault();

    this.postService
      .searchPosts(this.text)
      .subscribe((posts: Post[]) => (this.postStoreService.posts = posts));
  }
}
