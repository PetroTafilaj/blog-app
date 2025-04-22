// src/app/home.component.ts
import { Component, inject } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { NgFor, NgIf, SlicePipe } from '@angular/common';
import { computed } from '@angular/core';
import { postsSignal, deletePost } from '../posts/posts.state';
import { searchTermSignal } from '../search/search.state';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule, NgFor, NgIf, SlicePipe],
  templateUrl: './home.component.html',
})
export class HomeComponent {
  private router = inject(Router);

  filteredPosts = computed(() => {
    const term = searchTermSignal().toLowerCase();
    return postsSignal().filter(
      p =>
        p.title.toLowerCase().includes(term) ||
        p.content.toLowerCase().includes(term)
    );
  });

  viewDetail(id: string) {
    this.router.navigate(['/posts', id]);
  }

  private confirm = window.confirm;
  onDelete(id: string) {
    if (this.confirm('Are you sure you want to delete this post?')) {
      deletePost(id);
    }
  }
}
