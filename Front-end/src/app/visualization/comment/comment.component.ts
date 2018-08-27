import {Component, ElementRef, Input, OnInit, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {IssueModel} from "../../../shared/models/IssueModel";
import {CommentaryService} from "../../../shared/services/commentary.service";
import * as moment from "moment";
import {Moment} from "moment";
import {FormControl, Validators} from "@angular/forms";
import {InhabitantService} from "../../../shared/services/inhabitant.service";

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {
  comment = new FormControl('', [Validators.required]);
  @Input() issue: IssueModel;

  constructor(readonly commentService: CommentaryService, readonly inhabitantService :InhabitantService) {

  }


  ngOnInit() {
    this.commentService.getIssuesCommentaries(this.issue.id);
    this.inhabitantService.getCurrentMember();
  }

  formatDate(date: Moment): string {
    return moment(date).locale('FR').fromNow();
  }

  onClickSendButton() {
    if(this.comment.valid){
      this.inhabitantService.currentMember$.subscribe(value => {
        this.commentService.sendComment(this.comment.value, value.id, this.issue.id);
        this.comment.reset();
        this.comment.updateValueAndValidity();
      });
    }
  }

}
