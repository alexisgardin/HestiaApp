import {AfterViewInit, ChangeDetectorRef, Component, EventEmitter, Input, ViewChild} from "@angular/core";
import {MatDialog, MatDialogConfig, MatPaginator, MatSort} from "@angular/material";
import {IssueService} from "../../../shared/services/issue.service";
import {IssueModel} from "../../../shared/models/IssueModel";
import {Observable} from "rxjs/Observable";
import "rxjs/add/operator/mergeMap";
import {MaterializeAction} from "angular2-materialize";
import {SearchBarPipe} from "../search-bar/search-bar.pipe";
import {SearchBarComponent} from "../search-bar/search-bar.component";
import * as moment from "moment";
import {AppIssueDetailVisualizerComponent} from "../app-issue-detail-visualizer";
import {IssueModifierComponent} from "../issue-modifier/issue-modifier.component";
import {IssuesDataSource} from "./issues-table-datasource";

@Component({
    selector: 'app-issues-table',
    templateUrl: './issues-table.component.html',
    styleUrls: ['./issues-table.component.css']
})
export class IssuesTableComponent implements AfterViewInit {

    displayedColumns = ['state', 'title', 'type', 'author', 'date', 'priority', 'view', 'edit'];
    dataSource: IssuesDataSource;
    length: Observable<number>;

    @ViewChild(MatSort) sort: MatSort;
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @Input() searchBar: SearchBarComponent;
    @Input() searchPipe: SearchBarPipe;

    issueDetails = new Map<IssueModel, EventEmitter<string | MaterializeAction>>();
    issueModification = new Map<IssueModel, EventEmitter<string | MaterializeAction>>();

    constructor(readonly issueService: IssueService, readonly changeDetectorRefs: ChangeDetectorRef,
                private dialog: MatDialog) {
    }

    toLocaleDateString(date: string): string {
        return moment(date).locale('FR').format('L');
    }

    ngAfterViewInit() {
        this.refresh();
    }

    refresh(): void {
        this.dataSource = new IssuesDataSource(this.issueService, this.searchBar.refreshEvent,
            this.searchPipe, this.searchBar.searchTerm, this.searchBar.filters, this.sort,
            this.paginator, this.issueModification, this.issueDetails);
        this.changeDetectorRefs.detectChanges();
        this.setLength();
        this.length.subscribe(v => console.log(v));
    }

    closeModal(element: IssueModel): void {
        this.issueDetails.get(element).emit({action: 'modal', params: ['close']});
        this.issueModification.get(element).emit({action: 'modal', params: ['close']});
    }

    viewIssueDetails(element: IssueModel): void {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.data = element;
        dialogConfig.height = "80%";
        dialogConfig.width = "40%";
        dialogConfig.autoFocus = false;

        let dialogRef = this.dialog.open(AppIssueDetailVisualizerComponent, dialogConfig);
    }

    openModifyIssueModal(element: IssueModel): void {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.autoFocus = true;
        dialogConfig.data = element;
        dialogConfig.height = "80%";
        dialogConfig.width = "50%";

        let dialogRef = this.dialog.open(IssueModifierComponent, dialogConfig);
        dialogRef.afterClosed().subscribe(() => {
            this.issueService.getIssues();
            this.refresh();
        });
    }

    setLength(): void {
        this.length = this.issueService.issuesList$.map(data => data.length);
    }

    nothing(): void {
        return;
    }
}
