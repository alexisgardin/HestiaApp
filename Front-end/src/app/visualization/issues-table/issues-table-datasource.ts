import {Issue, IssueModel} from "../../../shared/models/IssueModel";
import {Observable} from "rxjs/Observable";
import {SearchBarPipe} from "../search-bar/search-bar.pipe";
import {IssueService} from "../../../shared/services/issue.service";
import {MaterializeAction} from "angular2-materialize";
import {MatPaginator, MatSort} from "@angular/material";
import {EventEmitter} from "@angular/core";
import {DataSource} from "@angular/cdk/collections";
import {merge} from "rxjs/observable/merge";
import * as moment from "moment";

export class IssuesDataSource extends DataSource<Issue> {

    private events: Map<IssueModel, EventEmitter<string | MaterializeAction>>[];

    constructor(readonly issueService: IssueService, readonly searchValueChange: Observable<any>,
                readonly searchPipe: SearchBarPipe, readonly searchTerm: string, readonly filters: string[],
                readonly _sort: MatSort, readonly _paginator: MatPaginator, ...events) {
        super();
        this.events = events;
    }

    /** Connect function called by the table to retrieve one stream containing the data to render. */
    connect(): Observable<Issue[]> {
        if (!this._sort) {
            return this.getSortedData();
        }

        const changes = [
            this.issueService.issuesList$,
            this._sort.sortChange,
            this._paginator.page,
            this.searchValueChange
        ];
        return merge(...changes).mergeMap(() => {
            return this.getSortedData();
        });
    }

    disconnect() {
    }

    /** Returns a sorted copy of the database data. */
    getSortedData(): Observable<Issue[]> {
        return this.issueService.issuesList$.map(dataToRead => {
            const pageNumber = this._paginator.pageIndex;
            const pageCount = this._paginator.pageSize;

            let data = dataToRead.slice(pageNumber * pageCount, pageNumber * pageCount + pageCount);
            if (this.searchTerm && this.searchTerm.length > 0 || this.filters.length > 0) {
                data = this.filterIssues(data);
            }

            this.initEvents(data);
            if (data.length <= 0 || !this._sort || !this._sort.active || this._sort.direction === '') {
                return data;
            }

            return data.sort((a, b) => {
                let propertyA: number | string = '';
                let propertyB: number | string = '';

                switch (this._sort.active) {
                    case 'title':
                        [propertyA, propertyB] = [a.title, b.title];
                        break;
                    case 'state':
                        [propertyA, propertyB] = [a.state.value, b.state.value];
                        break;
                    case 'type':
                        [propertyA, propertyB] = [a.type.name, b.type.name];
                        break;
                    case 'author':
                        [propertyA, propertyB] = [a.author.lastname, b.author.lastname];
                        break;
                    case 'date':
                        [propertyA, propertyB] = [moment(a.datetime_declaration).format('YYYY-MM-DD'),
                          moment(b.datetime_declaration).format('YYYY-MM-DD')];
                        break;
                    case 'priority':
                        [propertyA, propertyB] = [a.priority.value, b.priority.value];
                        break;
                }

                const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
                const valueB = isNaN(+propertyB) ? propertyB : +propertyB;

                return (valueA < valueB ? -1 : 1) * (this._sort.direction === 'asc' ? 1 : -1);
            });
        });
    }

    private filterIssues(data: IssueModel[]): IssueModel[] {
        return data.filter(issue => this.searchPipe.applyFilter(issue, this.searchTerm, this.filters));
    }

    private initEvents(data: IssueModel[]): void {
        this.events.forEach(event => {
            event.clear();
            data.forEach(issue => {
                event.set(issue, new EventEmitter<string | MaterializeAction>());
            });
        });
    }
}
