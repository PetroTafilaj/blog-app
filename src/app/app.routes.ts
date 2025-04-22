import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PostDetailComponent } from './posts/post-detail/post-detail.component';
import { PostEditorComponent } from './posts/post-editor/post-editor.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'posts/:id', component: PostDetailComponent },
  { path: 'editor', component: PostEditorComponent },
  { path: 'editor/:id', component: PostEditorComponent },
  { path: '**', redirectTo: '' }
];