import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MostRecentIssueElementComponent} from './app-most-recent-issue-element.component';
import {MaterializeModule} from "angular2-materialize";
import {AppIssueDetailVisualizerModule} from '../../../../../visualization/app-issue-detail-visualizer';
import {IssueModifierModule} from '../../../../../visualization/issue-modifier/issue-modifier.module';
import {MatDialogModule} from "@angular/material";

@NgModule({
    declarations: [MostRecentIssueElementComponent],
    imports: [CommonModule, MaterializeModule, AppIssueDetailVisualizerModule, IssueModifierModule, MatDialogModule],
    exports: [MostRecentIssueElementComponent],
    providers: [],
})
export class MostRecentIssueElementModule {
}
