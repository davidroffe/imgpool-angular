import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { PostStoreService } from './post-store.service';
import { Tag, Post } from '../shared/interfaces';

@Injectable({ providedIn: 'root' })
export class TagStoreService {
  constructor(private postStoreService: PostStoreService) {
    this.postStoreService.posts$.subscribe((posts: Post[]) =>
      this.getTagsFromPosts(posts)
    );
  }
  private readonly _tags = new BehaviorSubject<Tag[]>([]);

  readonly tags$ = this._tags.asObservable();

  get tags(): Tag[] {
    return this._tags.getValue();
  }

  set tags(val: Tag[]) {
    this._tags.next(val);
  }

  private getTagsFromPosts = (posts: Post[]) => {
    let newTags: Tag[] = [];
    let exists: boolean;

    if (posts[0]) {
      for (var i = 0; i < posts.length; i++) {
        for (var j = 0; j < posts[i].tag.length; j++) {
          exists = false;
          let tag = posts[i].tag[j];

          for (var k = 0; k < newTags.length; k++) {
            if (newTags[k].id === tag.id) {
              exists = true;
            }
          }

          tag.active = false;

          if (!exists) newTags.push(tag);
        }
      }
    }
    this.tags = newTags;
  };
}
