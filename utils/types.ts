import { ReactNode } from "react";

export type ChildProps = {
  pageTitle?: String;
  children: ReactNode;
};

export type Post = {
  id: number;
  title: string;
  body: string;
};

export type Users = {
  id: number;
  name: string;
  email: string;
  gender: string;
  status: string;
};

export type PostDetailProps = {
  post: Post;
  comments: Comment[];
};
