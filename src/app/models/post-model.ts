export interface Post {
  id: string;
  author: string;
  title: string;
  location: Coordinate;
  comments: Discussion[];
  numOfLikes: number;
  media: Media[];
  hashtags: string[];
  posted_date: Date;
  last_modified_date: Date;
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
  numOfLikes: number;
}

// tslint:disable-next-line:no-empty-interface
export interface Like { }

export interface Media {
  id: string;
  url: string;
  fileFormat: string;
  type: string;
}
