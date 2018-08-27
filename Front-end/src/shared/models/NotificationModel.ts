import {IssueModel} from "./IssueModel";

/**
 * Class that models the type of an issue
 */

export class NotificationModel {

  public id: number;
  public issueId: number;
  public unread: boolean;
  public issue: IssueModel;


  constructor(id: number, issueModel: IssueModel, issueId: number, unread: boolean = true) {
      this.id = id;
      this.issueId = issueId;
      this.unread = unread;
      this.issue = issueModel;
    };
}
