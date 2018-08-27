import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MostRecentIssuesComponent} from './app-most-recent-issues.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MostRecentIssueElementModule} from './most-recent-issue-element';
import {MatDialogModule} from "@angular/material";


@NgModule({
    declarations: [MostRecentIssuesComponent],
    imports: [CommonModule, BrowserAnimationsModule, MostRecentIssueElementModule],
    exports: [MostRecentIssuesComponent],
    providers: [],
})
export class MostRecentIssuesModule {
}
