import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CreatePostService } from './create-post.service';

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

  constructor(private formBuilder: FormBuilder, private createPostService: CreatePostService) { }

  ngOnInit() {
    this.uploadForm = this.formBuilder.group({
      media: [''],
      title: [''],
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
    const formData = new FormData();
    console.log(this.uploadForm.value);
    formData.append('media', this.uploadForm.value.media);
    formData.append('title', this.uploadForm.value.title);
    const locArray = ['0.3445','32.4353'];
    formData.append("location",JSON.stringify(locArray).replace(/[\[\]']+/g,''));
    const hashtagArray = this.uploadForm.value.hashtags.split(",");
    formData.append('hashtags',JSON.stringify(hashtagArray).replace(/[\[\]']+/g,''));
    console.log(formData);
    this.createPostService.createPost(formData).subscribe(res => {
      console.log(res);
      if(res.code==200){
        this.accepted = true;
      }
      this.message = res.message;
    }, err => console.log(err));
  }
}
