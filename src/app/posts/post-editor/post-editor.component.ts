import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { postsSignal, addPost, updatePost } from '../posts.state';
import { Post } from '../post.model';

@Component({
  selector: 'app-post-editor',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './post-editor.component.html',
})
export class PostEditorComponent {
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  form: FormGroup;
  isEdit = false;

  constructor() {
    this.form = new FormGroup({
      id: new FormControl(null),
      title: new FormControl('', Validators.required),
      content: new FormControl('', Validators.required)
    });

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEdit = true;
      const existing = postsSignal().find((p: Post) => p.id === id);
      if (existing) {
        this.form.patchValue(existing);
      }
    }
  }

  onSubmit() {
    const data: Post = this.form.value;
    if (this.isEdit) {
      updatePost(data);
    } else {
      addPost({ ...data, id: crypto.randomUUID() });
    }
    this.router.navigate(['/']);
  }
}