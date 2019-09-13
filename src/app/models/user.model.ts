export class User {
  id: string;
  username: string;
  email: string;
  birthday: Date;
  password: string;
  // tslint:disable-next-line:variable-name
  first_name: string;
  // tslint:disable-next-line:variable-name
  last_name: string;
  phone: string;
  followers: User[];
  followings: User[];
}
