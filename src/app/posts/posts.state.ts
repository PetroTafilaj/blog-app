import { signal } from '@angular/core';
import { Post } from './post.model';

const stored = localStorage.getItem('posts');
const initial: Post[] = stored ? JSON.parse(stored) : [];

const _posts = signal<Post[]>(initial);

export const postsSignal = _posts;
export const addPost    = (post: Post) => _posts.update(list => [...list, post]);
export const updatePost = (post: Post) =>
  _posts.update(list => list.map(p => p.id === post.id ? post : p));
export const deletePost = (id: string) =>
  _posts.update(list => list.filter(p => p.id !== id));
