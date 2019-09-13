import {User} from '../models/user.model';

export interface Post {
  id: number;
  title: string;
  date: Date;
  location: string;
  likes: User[];
}
