import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Post } from '../../shared/interfaces';
import { PostService } from '../../core/post.service';
import { UserStoreService } from '../../core/user-store.service';

@Component({
  selector: 'app-post-single',
  templateUrl: './post-single.component.html',
  styleUrls: ['./post-single.component.less'],
})
export class PostSingleComponent implements OnInit {
  post: Post = {
    id: 0,
    userId: 0,
    active: false,
    height: 0,
    width: 0,
    source: '',
    url: '',
    thumbUrl: '',
    createdAt: '',
    updatedAt: '',
    tag: [],
    user: {
      id: 0,
      username: '',
    },
  };
  optionsMenu: boolean = false;
  flagPost: { show: boolean; reason: string } = {
    show: false,
    reason: '',
  };
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private postService: PostService,
    public userStoreService: UserStoreService
  ) {}

  ngOnInit(): void {
    let id = +this.route.snapshot.paramMap.get('id');
    this.postService.getPost(id).subscribe((post) => (this.post = post));
  }

  toggleOptionsMenu(e: Event) {
    e.stopPropagation();

    this.optionsMenu = !this.optionsMenu;
  }

  toggleFavorite(e: Event) {
    e.preventDefault();

    this.postService.toggleFavorite(this.post.id).subscribe((res) => {
      // toast.success(
      //   `Post ${isFavorited() ? 'removed from' : 'added to'} favorites.`
      // );
      // props.dispatch(setUser('favorites', res.data.favorites));
    });
  }

  isFavorited() {
    for (let i = 0; i < this.userStoreService.user.favorites.length; i++) {
      if (this.userStoreService.user.favorites[i].id === this.post.id)
        return true;
    }
    return false;
  }

  deletePost = (e: Event) => {
    e.preventDefault();

    this.postService.deletePost(this.post.id).subscribe(() => {
      // toast.success('Post deleted.');
      // props.dispatch(setPostsList([]));
      this.router.navigate(['/posts']);
    });
  };
}
