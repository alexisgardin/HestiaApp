import {InhabitantModel} from "./InhabitantModel";
import {IssueModel} from "./IssueModel";
import * as moment from "moment";
import {Moment} from "moment";

export class CommentaryModel {
  content: string;
  issueid: number;
  memberid: number;
  author: InhabitantModel;
  issue: IssueModel;
  profileImageId: number;
  datetime_declaration: moment.Moment;

  constructor(content: string, issueid: number, memberid: number, author: InhabitantModel, issue: IssueModel, profileImageId: number, datetime_declaration: Moment) {
    this.author = author;
    this.content = content;
    this.issue = issue;
    this.memberid = memberid;
    this.profileImageId = profileImageId;
    this.issueid = issueid;
    this.datetime_declaration = datetime_declaration;
  }

  isAuthor() : boolean{
    return this.author.id == this.issue.authorId;
  }
}
