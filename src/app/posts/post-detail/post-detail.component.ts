import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { postsSignal, deletePost } from '../posts.state';
import { Post } from '../post.model';

@Component({
  selector: 'app-post-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './post-detail.component.html',
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
