import {User} from '../user/user.model';

export interface Post {
  id: number;
  title: string;
  date: Date;
  location: string;
  likes: User[];
}
