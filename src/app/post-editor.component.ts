import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { postsSignal, addPost, updatePost } from './posts.state';
import { Post } from './post.model';

@Component({
  selector: 'app-post-editor',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="container mx-auto p-4">
      <h1 class="text-2xl font-bold mb-4">{{ isEdit ? 'Edit' : 'New' }} Post</h1>
      <form [formGroup]="form" (ngSubmit)="onSubmit()" class="space-y-4">
        <div>
          <label class="block mb-1">Title</label>
          <input formControlName="title" class="w-full border rounded p-2" />
          <div *ngIf="form.controls['title'].invalid && form.controls['title'].touched" class="text-red-600">
            Title is required.
          </div>
        </div>
        <div>
          <label class="block mb-1">Content (Markdown)</label>
          <textarea formControlName="content" rows="8" class="w-full border rounded p-2"></textarea>
            <div *ngIf="form.controls['content'].invalid && form.controls['content'].touched"
                class="text-red-600">
                Content is required.
            </div>
        </div>
        <button type="submit" [disabled]="form.invalid" class="btn">
          {{ isEdit ? 'Update' : 'Create' }}
        </button>
      </form>
    </div>
  `
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