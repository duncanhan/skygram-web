export interface Post {
  id: string;
  author: string;
  title: string;
  location: Coordinate;
  comments: Discussion[];
  num_of_likes: number;
  media: Media[];
  hashtags: string[];
  posted_date: Date;
  last_modified_date: Date;
  username: string;
  is_liked: boolean;
}

export interface Coordinate {
  longitude: string;
  latitude: string;
}

// tslint:disable-next-line:no-empty-interface
export interface Discussion {
  id: string;
  text: string;
  date: Date;
  author: string;
  num_of_likes: number;
}

// tslint:disable-next-line:no-empty-interface
export interface Like { }

export interface Media {
  id: string;
  url: string;
  fileFormat: string;
  type: string;
}
