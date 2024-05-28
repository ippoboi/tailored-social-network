export interface Post {
  id: string;
  content: string;
  imageURL?: string;
  createdAt: string;
  author: User;
  avatar?: string;
  commentsAggregate: any;
  comments: Comment[];
  likesAggregate: any;
  likes: User[];
}

export interface User {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  avatar?: string;
  banner?: string;
  bio?: string;
  location?: string;
  job?: string;
  descText?: string;
  descLink?: string;
  followers: User[];
  following: User[];
  friends?: User[];
  posts: Post[];
  hobbies: Hobby[];
  likes: Post[];
  events: Event[];
  groups: Group[];
  createdAt: string;
}

export interface UserPostsQuery {
  userPosts: Post[];
}

export interface UserPostsQueryVariables {
  username: string;
}

export interface Comment {
  id: string;
  content: string;
  createdAt: string;
  post: Post;
  author: User;
}

export interface Hobby {
  id: string;
  name: string;
  users: User[];
}

export interface IEvent {
  id: string;
  name: string;
  eventImage: any;
  description: string;
  date: string;
  createdAt: Date;
  attendees: any;
  attendeesAggregate: any;
  location: string;
}

export interface Group {
  id: string;
  name: string;
  description: string;
  groupImage: string;
  createdAt: string;
  members: User[];
}
