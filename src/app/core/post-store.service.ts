import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { PostService } from './post.service';
import { Post } from '../shared/interfaces';

@Injectable({ providedIn: 'root' })
export class PostStoreService {
  constructor(private postService: PostService) {}
  private offset: number = 0;
  private readonly _posts = new BehaviorSubject<Post[]>([]);

  readonly posts$ = this._posts.asObservable();

  get posts(): Post[] {
    return this._posts.getValue();
  }

  set posts(val: Post[]) {
    this._posts.next(val);
  }

  fetchPosts() {
    this.postService.getPosts(this.offset).subscribe((data) => {
      this.posts = this.posts.concat(data);
      this.offset = this.posts.length;
    });
  }
}
