import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {IssueModule} from "../issue";
import {IssuesTableComponent} from "./issues-table.component";
import {
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableModule
} from "@angular/material";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {IssueModifierModule} from "../issue-modifier/issue-modifier.module";
import {AppIssueDetailVisualizerModule} from "../app-issue-detail-visualizer";
import {MaterializeModule} from "angular2-materialize";
import {SearchBarModule} from "../search-bar/search-bar.module";

const materialModules = [
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatPaginatorModule,
    MatSortModule,
    MatDialogModule,
    BrowserAnimationsModule
];

@NgModule({
    declarations: [IssuesTableComponent],
    imports: [
        CommonModule,
        MaterializeModule,
        AppIssueDetailVisualizerModule,
        IssueModifierModule,
        IssueModule,
        ...materialModules,
        SearchBarModule
    ],
    exports: [IssuesTableComponent],
    providers: [],
})
export class IssuesTableModule {
}
