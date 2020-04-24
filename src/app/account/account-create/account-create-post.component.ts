import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { PostService } from 'src/app/core/post.service';

@Component({
  selector: 'app-account-create-post',
  templateUrl: './account-create-post.component.html',
  styleUrls: ['./account-create-post.component.less'],
})
export class AccountCreatePostComponent implements OnInit {
  createPostForm: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<AccountCreatePostComponent>,
    private formBuilder: FormBuilder,
    private postService: PostService
  ) {}

  ngOnInit(): void {
    this.createPostForm = this.formBuilder.group({
      source: '',
      tags: '',
      file: {},
    });
  }

  close() {
    this.dialogRef.close();
  }

  fileSelected(file: object) {
    this.createPostForm.setValue({ ...this.createPostForm.value, file });
  }

  handleSubmit(e: Event) {
    e.preventDefault();

    let formData = new FormData();
    let newErrorMessage = [];

    if (
      this.createPostForm.get('file').value.fileFullName === undefined ||
      this.createPostForm.get('file').value.fileFullName === ''
    ) {
      newErrorMessage.push('Please select a file.');
    }
    if (this.createPostForm.get('tags').value.split(' ').length < 4) {
      newErrorMessage.push(
        'Minimum 4 space separated tags. ie: red race_car bmw m3'
      );
    }
    if (newErrorMessage.length > 0) {
      newErrorMessage.forEach((error) => {
        console.log(error);
      });
    } else {
      const params = {
        source: this.createPostForm.get('source').value.fileFullName,
        tags: this.createPostForm.get('tags').value,
      };

      formData.append('image', this.createPostForm.get('file').value.file);
      this.postService.createPost(formData, params).subscribe((data) => {
        this.createPostForm.reset();
        this.close();
      });
    }
  }
}
