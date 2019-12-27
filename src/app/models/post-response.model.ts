import {Post} from './post-model';

export interface PostResponse {
  code: number;
  message: string;
  data: PostDetail;
}

export interface PostDetail {
  content: Post[];
  // etc
}
