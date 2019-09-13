export interface Post {
  id: string;
  title: string;
  location: Coordinate;
  comments: Discussion[];
  likes: Like[];
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
export interface Discussion { }

// tslint:disable-next-line:no-empty-interface
export interface Like { }

export interface Media {
  id: string;
  url: string;
  fileFormat: string;
  type: string;
}
