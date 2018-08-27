import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/Rx";
import {CommentaryModel} from "../models/CommentaryModel";
import {API_URL} from "./rest/constants";
import {InhabitantService} from "./inhabitant.service";
import {forkJoin} from "rxjs/observable/forkJoin";

@Injectable()
export class CommentaryService {

  issueCommentaries$: Observable<CommentaryModel[]>;

  constructor(private http: HttpClient, readonly inhabitantService : InhabitantService) {
  }

  public getIssuesCommentaries(id){
    this.issueCommentaries$ = this.http.get<CommentaryModel[]>(API_URL + "Issues/" + id + "/commentaries?filter=" + JSON.stringify({
      include: ["author", "issue"], order: 'datetime_declaration ASC'
    })).mergeMap(comments => {
      console.log(comments);
      const data =
      comments.map( comment => {
        return this.inhabitantService.getProfileImage(comment.author.id).map( img => {
            return new CommentaryModel(comment.content, comment.issueid, comment.memberid, comment.author, comment.issue, img.id, comment.datetime_declaration);
          }
        );
      });
      return forkJoin(data).map(v => v);
    });
  }

  public sendComment(content, memberid, issueid){
    this.http.patch(API_URL+"Commentaries", {"content":content, "memberId":memberid, "issueId":issueid}).subscribe(() => this.getIssuesCommentaries(issueid));

  }

}
