export interface Post {
  id: number;
  userId: number;
  active: boolean;
  height: number;
  width: number;
  source: string;
  url: string;
  thumbUrl: string;
  createdAt: string;
  updatedAt: string;
  tag: Tag[];
  user?: {
    id: number;
    username: string;
  };
}

export interface Tag {
  id: number;
  name: string;
  taggedPost: object;
  active?: boolean;
}

export interface User {
  id: number;
  email: string;
  username: string;
  bio: string;
  loggedIn: boolean;
  admin: boolean;
  init: boolean;
  favorites: any[];
}

export interface Flag {
  id: number;
  postId: number;
  date: string;
  user: { id: number; username: string };
  active: boolean;
  reason: string;
}
