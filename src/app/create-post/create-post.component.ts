import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CreatePostService } from './create-post.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { DashboardComponent } from './../dashboard/dashboard.component';
@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss']
})
export class CreatePostComponent implements OnInit {
  uploadForm: FormGroup;
  mediaUrl: any;
  message: any;
  accepted: boolean;

  constructor(private formBuilder: FormBuilder, private createPostService: CreatePostService, private router: Router,
    private dashBoard: DashboardComponent) { }

  ngOnInit() {
    this.uploadForm = this.formBuilder.group({
      media: ['', Validators.required],
      title: ['', Validators.required],
      location: [''],
      hashtags: ['']
    });
    this.accepted = false;
  }

  onFileSelect(event) {
    if (event.target.files.length > 0) {
      this.mediaUrl = null;
      this.message = null;
      const file = event.target.files[0];
      this.uploadForm.get('media').setValue(file);

      var mimeType = file.type;
      if (mimeType.match(/image\/*/) == null && mimeType.match(/video\/*/) == null) {
        this.message = "Only images are supported.";
        this.accepted = false;
        return;
      }

      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (_event) => {
        this.mediaUrl = reader.result;
      }
    }
  }

  onSubmit() {
    if (this.uploadForm.valid) {
      const formData = new FormData();
      const locArray = ['0.3445','32.4353'];
      const hashtagArray = this.uploadForm.value.hashtags.split(",");
      formData.append('media', this.uploadForm.value.media);
      formData.append('title', this.uploadForm.value.title);
      formData.append("location", JSON.stringify(locArray));
      formData.append('hashtags', encodeURIComponent(JSON.stringify(hashtagArray)));
      this.createPostService.createPost(formData).subscribe(res => {
        if (res.code === 200) {
          this.accepted = true;
          this.dashBoard.ngOnInit();
        }
        this.message = res.message;
      },err => {
        Swal.fire(
          'Failed to upload!',
          err.error.message,
          'warning'
        );
      });
    } else {
      Swal.fire(
        'Failed to upload!',
        'Title and image are required~!',
        'warning'
      );
    }
  }
}
