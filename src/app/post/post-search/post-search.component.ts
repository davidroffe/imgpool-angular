import { Component, OnInit } from '@angular/core';

import { PostStoreService } from '../../core/post-store.service';

@Component({
  selector: 'app-post-search',
  templateUrl: './post-search.component.html',
  styleUrls: ['./post-search.component.less'],
})
export class PostSearchComponent implements OnInit {
  text: string = '';

  constructor(private postStoreService: PostStoreService) {}

  ngOnInit(): void {
    this.postStoreService.postSearchQuery$.subscribe((searchQuery: string) => {
      this.text = searchQuery;
    });
  }

  handleSubmit(e: Event) {
    e.preventDefault();

    this.postStoreService.postSearchQuery = this.text;
    this.postStoreService.fetchPosts();
  }
}
