import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { postsSignal, deletePost } from './posts.state';
import { Post } from './post.model';

@Component({
  selector: 'app-post-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="container mx-auto p-4">
      <div class="flex items-center mb-4">
        <button (click)="goBack()" class="btn mr-2">← Back</button>
        <button
          (click)="onDelete()"
          class="btn text-red-600 hover:underline"
        >
          Delete
        </button>
        <a
          [routerLink]="['/editor', post?.id]"
          class="btn ml-auto"
          >Edit</a
        >
      </div>

      <h1 class="text-3xl font-bold mb-2">{{ post?.title }}</h1>
      <div class="prose" [innerHTML]="post?.content"></div>
    </div>
  `,
})
export class PostDetailComponent {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private confirm = window.confirm;

  post: Post | undefined;

  constructor() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.post = postsSignal().find(p => p.id === id);
    }
  }

  goBack() {
    history.back();
  }

  onDelete() {
    if (!this.post) return;
    if (this.confirm('Delete this post permanently?')) {
      deletePost(this.post.id);
      this.router.navigate(['/']);
    }
  }
}
