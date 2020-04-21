import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Tag } from '../../shared/interfaces';
import { PostStoreService } from '../../core/post-store.service';
import { PostService } from '../../core/post.service';
import { TagStoreService } from '../../core/tag-store.service';

@Component({
  selector: 'app-tag-menu',
  templateUrl: './tag-menu.component.html',
  styleUrls: ['./tag-menu.component.less'],
})
export class TagMenuComponent implements OnInit {
  showMenu: boolean = false;
  constructor(
    private router: Router,
    public tagStoreService: TagStoreService,
    private postStoreService: PostStoreService,
    private postService: PostService
  ) {}

  ngOnInit(): void {}

  handleClick(e: Event) {
    e.preventDefault();

    const searchElement = e.target as HTMLInputElement;
    const searchQuery = searchElement.innerText;

    this.postStoreService.postSearchQuery = searchQuery;
    this.postStoreService.fetchPosts();
  }
}
