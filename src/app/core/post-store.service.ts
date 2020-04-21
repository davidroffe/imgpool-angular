import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { PostService } from './post.service';
import { Post } from '../shared/interfaces';

@Injectable({ providedIn: 'root' })
export class PostStoreService {
  constructor(private postService: PostService) {}
  private offset: number = 0;
  private readonly _posts = new BehaviorSubject<Post[]>([]);
  private readonly _postSearchQuery = new BehaviorSubject<string>('');

  readonly posts$ = this._posts.asObservable();
  readonly postSearchQuery$ = this._postSearchQuery.asObservable();

  get posts(): Post[] {
    return this._posts.getValue();
  }

  set posts(val: Post[]) {
    this._posts.next(val);
  }

  get postSearchQuery(): string {
    return this._postSearchQuery.getValue();
  }

  set postSearchQuery(val: string) {
    this._postSearchQuery.next(val);
  }

  fetchPosts() {
    if (this.postSearchQuery.length > 0) {
      this.postService
        .searchPosts(this.postSearchQuery)
        .subscribe((data: Post[]) => {
          this.posts = data;
          this.offset = 0;
        });
    } else {
      this.postService.getPosts(this.offset).subscribe((data: Post[]) => {
        this.posts = data;
        this.offset = 0;
      });
    }
  }
}
