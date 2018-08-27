import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CommentComponent} from "./comment.component";
import {MatButtonModule, MatFormFieldModule, MatIconModule, MatInputModule} from "@angular/material";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

@NgModule({
  imports: [
    CommonModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule, ReactiveFormsModule, FormsModule
  ],
  declarations: [
    CommentComponent],
  exports: [CommentComponent]
})
export class CommentModule {
}
