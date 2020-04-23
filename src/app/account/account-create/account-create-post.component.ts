import { Component, OnInit } from '@angular/core';

import { PostService } from 'src/app/core/post.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-account-create-post',
  templateUrl: './account-create-post.component.html',
  styleUrls: ['./account-create-post.component.less'],
})
export class AccountCreatePostComponent implements OnInit {
  createPostForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private postService: PostService
  ) {}

  ngOnInit(): void {
    this.createPostForm = this.formBuilder.group({
      post: [''],
      source: '',
      tags: '',
    });
  }

  handleSubmit(e: Event) {
    e.preventDefault();
    console.log(this.createPostForm);

    // const url = '/api/post/create';
    // let formData = new FormData();
    // const config = {
    //   headers: {
    //     'content-type': 'multipart/form-data'
    //   }
    // };
    // let newErrorMessage = [];

    // if (createPost.file.name === undefined || createPost.file.name === '') {
    //   newErrorMessage.push('Please select a file.');
    // }
    // if (createPost.tags.split(' ').length < 4) {
    //   newErrorMessage.push(
    //     'Minimum 4 space separated tags. ie: red race_car bmw m3'
    //   );
    // }
    // if (newErrorMessage.length > 0) {
    //   newErrorMessage.forEach(error => {
    //     //toast.error(error);
    //   });
    // } else {
    //   config.params = {
    //     source: createPost.source,
    //     tags: createPost.tags
    //   };
    //   formData.append('image', createPost.file.value);
    //   this.postService.createPost(formData).subscribe(data => {
    //     // clearValues();
    //     // props.dispatch(setPosts({ list: [], offset: 0 }));
    //   });
  }
}
