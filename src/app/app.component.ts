import { Component, effect } from '@angular/core';
import { RouterModule } from '@angular/router';
import { postsSignal } from './posts/posts.state';
import { HeaderComponent } from "./header/header.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, HeaderComponent],
  templateUrl: './app.component.html',
})
export class AppComponent {
  constructor() {
    effect(() => {
      const posts = postsSignal();
      localStorage.setItem('posts', JSON.stringify(posts));
    });
  }
}
