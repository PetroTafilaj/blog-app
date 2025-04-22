// src/app/home.component.ts
import { Component, inject } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { NgFor, NgIf, SlicePipe } from '@angular/common';
import { computed } from '@angular/core';
import { postsSignal, deletePost } from './posts.state';
import { searchTermSignal } from './search.state';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule, NgFor, NgIf, SlicePipe],
  template: `
    <div class="container mx-auto p-6">
      <div class="flex justify-between items-center mb-6">
        <h1 class="text-2xl font-bold">All Posts</h1>
        <a
          routerLink="/editor"
          class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >New Post</a
        >
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          *ngFor="let post of filteredPosts()"
          (click)="viewDetail(post.id)"
          class="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 flex flex-col cursor-pointer hover:shadow-xl transition"
        >
          <h2 class="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-2">
            {{ post.title }}
          </h2>
          <p class="flex-1 text-gray-600 dark:text-gray-300 mb-4">
            {{
              post.content.length > 150
                ? (post.content | slice: 0:150) + '…'
                : post.content
            }}
          </p>
          <div class="mt-auto flex space-x-2">
            <a
              [routerLink]="['/editor', post.id]"
              (click)="$event.stopPropagation()"
              class="flex-1 text-center px-3 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
              >Edit</a
            >
            <button
              (click)="onDelete(post.id); $event.stopPropagation()"
              class="flex-1 text-center px-3 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
            >
              Delete
            </button>
          </div>
        </div>
      </div>

      <p
        *ngIf="filteredPosts().length === 0"
        class="text-center text-gray-500 dark:text-gray-300 mt-10"
      >
        No posts match your search.
      </p>
    </div>
  `,
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
