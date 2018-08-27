import {AfterViewInit, ChangeDetectorRef, Component, Input, OnInit, ViewChild} from '@angular/core';
import {InhabitantService} from '../../../../../../shared/services/inhabitant.service';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import {forkJoin} from 'rxjs/observable/forkJoin';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import * as moment from "moment";

@Component({
  selector: 'app-leaderboard-year',
  templateUrl: '../leaderboard-table.component.html',
  styleUrls: ['../leaderboard.component.css']
})
export class LeaderBoardOneYearComponent implements OnInit, AfterViewInit {
  datasource = new MatTableDataSource();
  displayedColumns = ['name', 'numberOfAssignedIssue', 'numberOfResolvedIssue', 'averageTimeForResolve'];
  length : Observable<number>;
  @ViewChild(MatPaginator) paginator;
  @ViewChild(MatSort) sort;

  constructor(readonly inhabitantService: InhabitantService, readonly changeDetectorRefs: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.inhabitantService.getMembers();
  }

  ngAfterViewInit() {
    const dateFromYear: Date = new Date(Date.now());
    dateFromYear.setFullYear(dateFromYear.getFullYear() - 1);
    this.getDataFromInterval(new Date(dateFromYear), new Date(Date.now())).subscribe(value => {
      this.datasource.data = value;
      this.datasource.paginator = this.paginator;
      this.datasource.sort = this.sort;
    });
  }

  getDataFromInterval(dateFrom: Date, dateTo: Date): Observable<any[]> {
    return this.inhabitantService.inhabitantsList$.mergeMap(membres => {
      this.length = Observable.of(membres.length);
      const getUnresolved = membres.map(membre => {
        return this.inhabitantService.getNumberOfAssignedIssueByMemberAndDate(membre.id, dateFrom, dateTo).map((issues: any) => {
          return <any>{
            'name': membre.firstname + ' ' + membre.lastname,
            'numberOfAssignedIssue': (<any>issues).length,
            'numberOfResolvedIssue': (<any>issues.filter(value => value.state.value === 1)).length,
            'averageTimeForResolve': (<any>this.computeAverageTimeForResolveIssue(issues.filter(value => value.state.value === 1)))
          };
        });
      });
      return forkJoin(getUnresolved).map(v => v);
    });
  }
  public computeAverageTimeForResolveIssue(issues:any):number{
    if(issues.length == 0){
      return 0;
    }
    return issues.map(value => {
      return moment(value.datetime_resolution).diff(value.datetime_declaration, 'days');
    }).reduce((sum, current) => sum + current)/issues.length;
  }

}
