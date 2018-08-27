import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NumberCardComponent} from "./number-card.component";
import {BrowserModule} from "@angular/platform-browser";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

@NgModule({
  declarations: [NumberCardComponent],
  imports: [CommonModule, BrowserModule, BrowserAnimationsModule],
  exports: [NumberCardComponent],
  providers: [],
})
export class NumberCardDashboardModule {
}
