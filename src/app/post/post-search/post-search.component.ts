import { Component, OnInit } from '@angular/core';

import { PostService } from '../../core/post.service';

@Component({
  selector: 'app-post-search',
  templateUrl: './post-search.component.html',
  styleUrls: ['./post-search.component.less'],
})
export class PostSearchComponent implements OnInit {
  text: string = '';

  constructor(private postService: PostService) {}

  ngOnInit(): void {}

  handleSubmit(searchQuery: string) {
    this.postService.searchPosts(searchQuery);
  }
}
