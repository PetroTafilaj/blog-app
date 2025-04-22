import { Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { PostDetailComponent } from './post-detail.component';
import { PostEditorComponent } from './post-editor.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'posts/:id', component: PostDetailComponent },
  { path: 'editor', component: PostEditorComponent },
  { path: 'editor/:id', component: PostEditorComponent },
  { path: '**', redirectTo: '' }
];