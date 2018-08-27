import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {IssueComponent} from "./app-issue.component";
import {MaterializeModule} from "angular2-materialize";
import {AppIssueDetailVisualizerModule} from "../app-issue-detail-visualizer";
import {IssueModifierModule} from "../issue-modifier/issue-modifier.module";
import {MatDialogModule} from "@angular/material";

@NgModule({
    declarations: [IssueComponent],
    imports: [
        CommonModule,
        MaterializeModule,
        AppIssueDetailVisualizerModule,
        IssueModifierModule,
        MatDialogModule
    ],
    exports: [IssueComponent],
    providers: [],
})
export class IssueModule {
}
