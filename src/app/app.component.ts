// app.component.ts
import { Component, effect } from '@angular/core';
import { RouterModule } from '@angular/router';
import { postsSignal } from './posts.state';
import { HeaderComponent } from "./header.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, HeaderComponent],
  template: `<app-header></app-header><router-outlet></router-outlet>`,
})
export class AppComponent {
  constructor() {
    // now this runs inside Angular’s injector
    effect(() => {
      const posts = postsSignal();
      localStorage.setItem('posts', JSON.stringify(posts));
    });
  }
}
