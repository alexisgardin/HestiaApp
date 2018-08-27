import {Component, OnInit} from '@angular/core';
import {NotificationService} from '../../../../shared/services/notification.service';
import {InhabitantService} from '../../../../shared/services/inhabitant.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {

  constructor(readonly notificationService: NotificationService, readonly authService: InhabitantService) {
  }

  apiTimer: any;

  ngOnInit() {
    this.authService.currentMember$.subscribe(value => {
      this.notificationService.getNotifications(value.id);
    });

    this.apiTimer = setInterval(() => {
      this.authService.currentMember$.subscribe(value => {
        this.notificationService.getNotifications(value.id);
      });
    }, (6000));
  }

  readNotificationOfUser() {
    this.authService.currentMember$.subscribe(value => {
      this.notificationService.readNotification(value.id);
    });
  }
}
