import { runInInjectionContext, effect, Injector } from '@angular/core';
import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';
import { postsSignal } from './app/posts/posts.state';
import { provideRouter } from '@angular/router';
import { bootstrapApplication } from '@angular/platform-browser';

bootstrapApplication(AppComponent, {
  providers: [ provideRouter(routes) ]
}).then((appRef: { injector: Injector; }) => {
  runInInjectionContext(appRef.injector, () => {
    effect(() => {
      const posts = postsSignal();
      localStorage.setItem('posts', JSON.stringify(posts));
    });
  });
});
