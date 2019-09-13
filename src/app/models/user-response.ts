import {User} from './user.model';

export interface  UserResponse {
  code: number;
  message: string;
  data: User;
}
