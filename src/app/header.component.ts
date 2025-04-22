// header.component.ts
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule, NgIf } from '@angular/common';
import { searchTermSignal } from './search.state';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, NgIf],
  template: `
    <header class="bg-white dark:bg-gray-800 shadow p-4 flex items-center justify-between">
      <a routerLink="/" class="text-xl font-bold text-gray-800 dark:text-gray-200">
        My Blog
      </a>
      <div class="flex items-center space-x-4">
        <!-- Search box -->
        <input
          type="text"
          placeholder="Search posts…"
          [value]="searchTerm()"
          (input)="onSearch($any($event.target).value)"
          class="border rounded px-2 py-1 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
        />
        <!-- Theme toggle -->
        <button (click)="toggleTheme()" class="focus:outline-none">
          <span *ngIf="!isDark" class="text-xl">🌞</span>
          <span *ngIf="isDark"  class="text-xl">🌙</span>
        </button>
      </div>
    </header>
  `
})
export class HeaderComponent implements OnInit {
  searchTerm = searchTermSignal;
  isDark = false;

  ngOnInit() {
    // read saved theme
    this.isDark = localStorage.getItem('theme') === 'dark';
    if (this.isDark) {
      document.documentElement.classList.add('dark');
    }
  }

  onSearch(value: string) {
    this.searchTerm.set(value);
  }

  toggleTheme() {
    this.isDark = !this.isDark;
    if (this.isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }
}
