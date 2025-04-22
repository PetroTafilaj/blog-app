import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule, NgIf } from '@angular/common';
import { searchTermSignal } from '../search/search.state';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, NgIf],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {
  searchTerm = searchTermSignal;
  isDark = false;

  ngOnInit() {
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
