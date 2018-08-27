import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {IssuesWrapperComponent} from "./issues-wrapper.component";
import {IssuesModule} from "../issues";
import {IssuesTableModule} from "../issues-table/issues-table.module";
import {SearchBarModule} from "../search-bar/search-bar.module";

@NgModule({
  imports: [
    CommonModule,
    IssuesModule,
    IssuesTableModule,
    SearchBarModule
  ],
  exports: [
    IssuesWrapperComponent
  ],
  declarations: [
    IssuesWrapperComponent
  ]
})
export class IssuesWrapperModule { }
