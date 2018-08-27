import {IssuesComponent} from "./issues.component";
import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {IssueModule} from "../issue";
import {SearchBarModule} from "../search-bar/search-bar.module";

@NgModule({
  declarations: [IssuesComponent],
  imports: [CommonModule, IssueModule, SearchBarModule],
  exports: [IssuesComponent],
  providers: [],
})
export class IssuesModule {
}
