import {Injectable} from '@angular/core';
import {IssueService} from "./issue.service";
import {API_URL} from "./rest/constants";
import {HttpClient} from "@angular/common/http";
import {NotificationModel} from "../models/NotificationModel";
import {Observable} from "rxjs/Observable";
import {forkJoin} from "rxjs/observable/forkJoin";
import {Subject} from "rxjs/Subject";

@Injectable()
export class NotificationService {

  public notificationsList$: Observable<NotificationModel[]>;
  public numberOfUnread: Subject<number> = new Subject<number>();

  constructor(private issueService: IssueService, private http: HttpClient) {
  }

  public getNotifications(id: number) {
    this.notificationsList$ = this.http.get<NotificationModel[]>(API_URL + "/Members/" + id + "/notifications").mergeMap(models => {
      this.numberOfUnread.next(models.filter(model => model.unread === true).length);
      const data = models.map(model => {
        return this.issueService.getIssue(model.issueId).map(value => {
          return new NotificationModel(model.id, value, model.issueId, model.unread);
        });
      });

      return forkJoin(data).map(v => v);
    });
  }

  /**
   * Make read notification
   * @param id of a user
   */
  public readNotification(id: number) {
    this.notificationsList$.subscribe(models => {
      const table = [];
      this.numberOfUnread.next(0);
      models.filter(notif => notif.unread === true).forEach(model => {
        table.push(this.http.patch(API_URL + /Notifications/ + model.id, {"id": model.id, "unread": false}));
      });

      forkJoin(table).subscribe();
    });
  }
}
