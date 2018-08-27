import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {StackedVerticalBarComponent} from "./stacked-vertical-bar.component";
@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [StackedVerticalBarComponent],
  exports:[StackedVerticalBarComponent]
})
export class StackedVerticalBarModule { }
