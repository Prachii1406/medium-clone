export interface Author {
  name: string;
  avatar: string;
  verified: boolean;
}

export interface Collection {
  name: string;
  icon: string;
}

export interface Article {
  id: string;
  title: string;
  subtitle: string;
  author: Author;
  collection?: Collection;
  thumbnail?: string;
  date: string;
  claps: number;
  comments: number;
  featured: boolean;
}

export interface Profile {
  name: string;
  avatar: string;
  followers: number;
  following: number;
}