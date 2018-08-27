import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {AppIssueDetailVisualizerComponent} from "./app-issue-detail-visualizer.component";
import {UICarouselModule} from "ui-carousel";
import {MatDialogModule} from "@angular/material";
import {CommentModule} from "../comment/comment.module";

@NgModule({
    declarations: [AppIssueDetailVisualizerComponent],
    imports: [CommonModule, UICarouselModule, MatDialogModule, CommentModule],
    exports: [AppIssueDetailVisualizerComponent],
    providers: [],
    entryComponents: [AppIssueDetailVisualizerComponent]
})
export class AppIssueDetailVisualizerModule {
}
