import { Pipe, PipeTransform } from '@angular/core';
import {NotificationModel} from "../../../../shared/models/NotificationModel";
import {Observable} from "rxjs/Observable";

@Pipe({
  name: 'notificationPipe'
})
export class NotificationPipe implements PipeTransform {

  transform(items: NotificationModel[]) {
    if (items==null) {
      return null;
    }
    return items.filter((item) => item.unread === true);
  }
  }

