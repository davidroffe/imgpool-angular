import { Component, OnInit } from '@angular/core';

import { PostStoreService } from 'src/app/core/post-store.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.less'],
})
export class PostListComponent implements OnInit {
  showLoadMore: boolean = false;
  hasPosts: boolean = false;

  constructor(public postStoreService: PostStoreService) {}

  ngOnInit(): void {
    this.postStoreService.posts$.subscribe((data) => {
      this.hasPosts = data.length > 0;
      this.showLoadMore = data.length % 18 !== 0 ? false : true;
    });

    if (!this.postStoreService.posts.length) {
      this.postStoreService.fetchPosts();
    }
  }
}
