import {Component, OnInit} from '@angular/core';
import {User} from '../models/user.model';
import {Post} from '../models/post-model';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {UserResponse} from '../models/user-response';
import {PostResponse} from '../models/post-response.model';
import {ActivatedRoute, Params} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  username: string;
  user: User;
  posts: Post[];
  headers = new HttpHeaders({
    Authorization: 'Bearer ' + localStorage.getItem('token')
  });

  constructor(private httpClient: HttpClient, private activatedRoute: ActivatedRoute, private alert: ToastrService) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      if (Object.keys(params).length > 0 && params.username !== null) {
        this.username = params.username;
      } else {
        this.username = localStorage.getItem('username');
      }
    });
    this.getUserDetails(this.username);
    this.getUserPosts(this.username);
  }

  getUserDetails(username: string): void {
    const url = environment.url + '/users/' + username;
    this.httpClient.get<UserResponse>(url, {headers: this.headers}).subscribe(
      response => {
        if (response.code === 200) {
          this.user = response.data as User;
        }
      }, error => {
        this.handleError(error);
      });
  }

  getUserPosts(username: string): void {
    const url = environment.url + '/users/' + username + '/posts';
    this.httpClient.get<PostResponse>(url, {headers: this.headers}).subscribe(
      response => {
        if (response.code === 200) {
          this.posts = response.data.content as Post[];
        }
      }, error => {
        this.handleError(error);
      });
  }

  deletePost(postId: string): void {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Post will be deleted!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        this.httpClient.delete(environment.url + '/posts/' + postId, {headers: this.headers}).subscribe(
          res => {
            Swal.fire(
              'Deleted!',
              'Your post has been deleted.',
              'success'
            ).then(() => location.reload());
          }, err => {
            Swal.fire(
              'Failed!',
              err.error.message,
              'warning'
            );
          });
      }
    });
  }

  like(post,event){
    const target = event.target || event.srcElement || event.currentTarget;
    console.log(event);
    const url = environment.url + '/posts/' + post.id + "/like";
    this.httpClient.post<any>(url, [], {headers: this.headers}).subscribe(
      response => {
        console.log(response);
        if (response.code === 200) {
          console.log(response.message);
          target.classList.add("text-success");
          target.style["pointer-events"] ="none";
          post.numOfLikes+=1;
        }
      },
      error => {
        this.handleError(error);
      });
  }

  handleError(error: string): void {
    console.log('Could not fetch content from server: ' + JSON.stringify(error));
  }
}
