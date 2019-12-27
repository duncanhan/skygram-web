import {Component, OnInit, Input} from '@angular/core';
import {User} from '../models/user.model';
import {Post} from '../models/post-model';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import { ActivatedRoute, Params, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-comment-box',
  templateUrl: './comment-box.component.html',
  styleUrls: ['./comment-box.component.scss']
})
export class CommentBoxComponent implements OnInit {

  constructor(private httpClient: HttpClient, private activatedRoute: ActivatedRoute,private router: Router) { }
  @Input() postId: string;
  user: User;
  post: Post;
  element: HTMLElement;

  headers = new HttpHeaders({
    Authorization: 'Bearer ' + localStorage.getItem('token')
  });
  ngOnInit() {
    this.getPost();
  }

  getPost(): void {
    const url = environment.url + '/posts/' + this.postId;
    this.httpClient.get<any>(url, {headers: this.headers}).subscribe(
      response => {
        if (response.code === 200) {
          this.post = response.data;
        }
      }, error => {
        this.handleError(error);
      });
  }
  deleteComment(postId: string, commentId: string): void {
    Swal.fire({
      title: 'Are you sure?',
      text: 'This comment this be deleted!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        this.httpClient.delete(environment.url + '/posts/' + postId + '/comments/' + commentId, {headers: this.headers}).subscribe(
          res => {
            Swal.fire(
              'Deleted!',
              'Your comment has been deleted.',
              'success'
            ).then(() => this.ngOnInit());
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
  onSubmit(postId: string, event) {
    if (event.keyCode === 13 && !event.shiftKey) {
    event.preventDefault();
    const url = `${environment.url}/posts/${postId}/comments`;
    this.element = document.getElementById(`${postId}comment-area`);
    // @ts-ignore
    const comment = this.element.value;
    this.httpClient.post<any>(url, {text: comment}, {headers: this.headers}).subscribe(response => {
      if (response.code === 200) {
        this.ngOnInit();
      }
    }, error => {
      this.handleError(error);
    });
    // @ts-ignore
    this.element.value = '';
    }
  }
  handleError(error: string): void {
    console.log('Could not fetch content from server: ' + JSON.stringify(error));
  }
}
